import { supabase } from './supabase';
import { logActivity } from './auth';

export interface Campaign {
  id: string;
  creator_id: string;
  title: string;
  title_bangla: string;
  description: string;
  description_bangla: string;
  category: string;
  goal_amount: number | null;
  goal_type: string | null;
  target_number: number | null;
  image_url: string | null;
  video_url: string | null;
  documents: any[];
  district: string | null;
  location: string | null;
  target_audience: string[];
  status: string;
  current_amount: number;
  current_supporters: number;
  views_count: number;
  shares_count: number;
  start_date: string | null;
  end_date: string | null;
  completed_at: string | null;
  is_featured: boolean;
  is_verified: boolean;
  tags: string[];
  hashtags: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignData {
  title: string;
  title_bangla: string;
  description: string;
  description_bangla: string;
  category: string;
  goal_amount?: number;
  goal_type?: 'fundraising' | 'awareness' | 'petition' | 'volunteer';
  target_number?: number;
  image_url?: string;
  district?: string;
  location?: string;
  target_audience?: string[];
  start_date?: string;
  end_date?: string;
  tags?: string[];
  hashtags?: string[];
}

/**
 * Create a new campaign
 */
export async function createCampaign(userId: string, data: CreateCampaignData) {
  try {
    const { data: campaign, error } = await supabase
      .from('campaigns')
      .insert({
        creator_id: userId,
        ...data,
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(userId, 'campaign_created', {
      campaign_id: campaign.id,
      category: data.category,
    });

    // Update user stats
    await supabase.rpc('increment_user_campaigns', { user_id: userId });

    return campaign;
  } catch (error: any) {
    console.error('Create campaign error:', error);
    throw new Error(error.message || 'Failed to create campaign');
  }
}

/**
 * Update campaign
 */
export async function updateCampaign(
  campaignId: string,
  userId: string,
  updates: Partial<Campaign>
) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', campaignId)
      .eq('creator_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Update campaign error:', error);
    throw new Error(error.message || 'Failed to update campaign');
  }
}

/**
 * Delete campaign
 */
export async function deleteCampaign(campaignId: string, userId: string) {
  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId)
      .eq('creator_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Delete campaign error:', error);
    throw new Error(error.message || 'Failed to delete campaign');
  }
}

/**
 * Get campaign by ID
 */
export async function getCampaign(campaignId: string) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        creator:user_profiles!creator_id(
          id,
          full_name,
          avatar_url,
          district
        )
      `)
      .eq('id', campaignId)
      .single();

    if (error) throw error;

    // Increment view count
    await supabase
      .from('campaigns')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', campaignId);

    return data;
  } catch (error: any) {
    console.error('Get campaign error:', error);
    throw new Error(error.message || 'Campaign not found');
  }
}

/**
 * Get all campaigns with filters
 */
export async function getCampaigns(filters: {
  status?: string;
  category?: string;
  district?: string;
  creator_id?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sort_by?: string;
}) {
  try {
    let query = supabase
      .from('campaigns')
      .select(`
        *,
        creator:user_profiles!creator_id(
          id,
          full_name,
          avatar_url,
          district
        )
      `, { count: 'exact' });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.district) {
      query = query.eq('district', filters.district);
    }
    if (filters.creator_id) {
      query = query.eq('creator_id', filters.creator_id);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Sorting
    if (filters.sort_by === 'popular') {
      query = query.order('views_count', { ascending: false });
    } else if (filters.sort_by === 'supporters') {
      query = query.order('current_supporters', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { campaigns: data, total: count };
  } catch (error: any) {
    console.error('Get campaigns error:', error);
    throw new Error(error.message || 'Failed to fetch campaigns');
  }
}

/**
 * Support a campaign
 */
export async function supportCampaign(data: {
  campaign_id: string;
  user_id: string;
  support_type: 'donation' | 'volunteer' | 'signature' | 'share';
  amount?: number;
  message?: string;
  is_anonymous?: boolean;
}) {
  try {
    const { data: support, error } = await supabase
      .from('campaign_supporters')
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(data.user_id, 'campaign_supported', {
      campaign_id: data.campaign_id,
      support_type: data.support_type,
    });

    return support;
  } catch (error: any) {
    console.error('Support campaign error:', error);
    throw new Error(error.message || 'Failed to support campaign');
  }
}

/**
 * Add campaign update
 */
export async function addCampaignUpdate(data: {
  campaign_id: string;
  creator_id: string;
  title: string;
  content: string;
  update_type: string;
  media_urls?: string[];
}) {
  try {
    const { data: update, error } = await supabase
      .from('campaign_updates')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return update;
  } catch (error: any) {
    console.error('Add campaign update error:', error);
    throw new Error(error.message || 'Failed to add update');
  }
}

/**
 * Get campaign updates
 */
export async function getCampaignUpdates(campaignId: string) {
  try {
    const { data, error } = await supabase
      .from('campaign_updates')
      .select(`
        *,
        creator:user_profiles!creator_id(
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get campaign updates error:', error);
    return [];
  }
}

/**
 * Add comment to campaign
 */
export async function addCampaignComment(data: {
  campaign_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string;
}) {
  try {
    const { data: comment, error } = await supabase
      .from('campaign_comments')
      .insert(data)
      .select(`
        *,
        user:user_profiles!user_id(
          id,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    return comment;
  } catch (error: any) {
    console.error('Add comment error:', error);
    throw new Error(error.message || 'Failed to add comment');
  }
}

/**
 * Get campaign comments
 */
export async function getCampaignComments(campaignId: string) {
  try {
    const { data, error } = await supabase
      .from('campaign_comments')
      .select(`
        *,
        user:user_profiles!user_id(
          id,
          full_name,
          avatar_url
        ),
        replies:campaign_comments!parent_comment_id(
          *,
          user:user_profiles!user_id(
            id,
            full_name,
            avatar_url
          )
        )
      `)
      .eq('campaign_id', campaignId)
      .is('parent_comment_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get comments error:', error);
    return [];
  }
}

/**
 * Get campaign supporters
 */
export async function getCampaignSupporters(campaignId: string) {
  try {
    const { data, error } = await supabase
      .from('campaign_supporters')
      .select(`
        *,
        user:user_profiles!user_id(
          id,
          full_name,
          avatar_url,
          district
        )
      `)
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get supporters error:', error);
    return [];
  }
}

/**
 * Publish campaign (change from draft to pending review)
 */
export async function publishCampaign(campaignId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ status: 'pending_review' })
      .eq('id', campaignId)
      .eq('creator_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Publish campaign error:', error);
    throw new Error(error.message || 'Failed to publish campaign');
  }
}

/**
 * Subscribe to campaign real-time updates
 */
export function subscribeToCampaign(
  campaignId: string,
  onUpdate: (payload: any) => void
) {
  const subscription = supabase
    .channel(`campaign:${campaignId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'campaigns',
        filter: `id=eq.${campaignId}`,
      },
      onUpdate
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Subscribe to campaign comments real-time
 */
export function subscribeToCampaignComments(
  campaignId: string,
  onComment: (payload: any) => void
) {
  const subscription = supabase
    .channel(`campaign-comments:${campaignId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'campaign_comments',
        filter: `campaign_id=eq.${campaignId}`,
      },
      onComment
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
