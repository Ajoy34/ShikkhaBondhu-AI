import { supabase } from './supabase';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  title_bangla: string | null;
  message: string;
  message_bangla: string | null;
  notification_type: string;
  priority: string;
  action_url: string | null;
  action_label: string | null;
  is_read: boolean;
  is_archived: boolean;
  read_at: string | null;
  sent_via_email: boolean;
  sent_via_push: boolean;
  sent_via_sms: boolean;
  created_at: string;
  expires_at: string | null;
}

/**
 * Create a notification
 */
export async function createNotification(data: {
  user_id: string;
  title: string;
  title_bangla?: string;
  message: string;
  message_bangla?: string;
  notification_type: string;
  priority?: string;
  action_url?: string;
  action_label?: string;
  expires_at?: string;
}) {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return notification;
  } catch (error: any) {
    console.error('Create notification error:', error);
    throw new Error(error.message || 'Failed to create notification');
  }
}

/**
 * Get user notifications
 */
export async function getUserNotifications(
  userId: string,
  filters?: {
    is_read?: boolean;
    notification_type?: string;
    limit?: number;
  }
) {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_archived', false)
      .order('created_at', { ascending: false });

    if (filters?.is_read !== undefined) {
      query = query.eq('is_read', filters.is_read);
    }

    if (filters?.notification_type) {
      query = query.eq('notification_type', filters.notification_type);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get notifications error:', error);
    return [];
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Mark as read error:', error);
    throw new Error(error.message || 'Failed to mark as read');
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(userId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Mark all as read error:', error);
    throw new Error(error.message || 'Failed to mark all as read');
  }
}

/**
 * Archive notification
 */
export async function archiveNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_archived: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Archive notification error:', error);
    throw new Error(error.message || 'Failed to archive notification');
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Delete notification error:', error);
    throw new Error(error.message || 'Failed to delete notification');
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false)
      .eq('is_archived', false);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Get unread count error:', error);
    return 0;
  }
}

/**
 * Subscribe to real-time notifications
 */
export function subscribeToNotifications(
  userId: string,
  onNotification: (notification: Notification) => void
) {
  const subscription = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onNotification(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Send welcome notification to new user
 */
export async function sendWelcomeNotification(userId: string) {
  return createNotification({
    user_id: userId,
    title: 'Welcome to ShikkhaBondhu AI! 🎉',
    title_bangla: 'ShikkhaBondhu AI-তে স্বাগতম! 🎉',
    message: 'Start exploring our AI-powered chat, courses, and campaigns to make an impact!',
    message_bangla: 'আমাদের AI-চালিত চ্যাট, কোর্স এবং ক্যাম্পেইন অন্বেষণ শুরু করুন!',
    notification_type: 'system',
    priority: 'normal',
  });
}

/**
 * Send campaign notification
 */
export async function sendCampaignNotification(data: {
  user_id: string;
  campaign_id: string;
  title: string;
  message: string;
  action_label?: string;
}) {
  return createNotification({
    user_id: data.user_id,
    title: data.title,
    message: data.message,
    notification_type: 'campaign',
    priority: 'normal',
    action_url: `/campaigns/${data.campaign_id}`,
    action_label: data.action_label || 'View Campaign',
  });
}

/**
 * Send achievement notification
 */
export async function sendAchievementNotification(data: {
  user_id: string;
  title: string;
  title_bangla: string;
  message: string;
  message_bangla: string;
}) {
  return createNotification({
    user_id: data.user_id,
    title: data.title,
    title_bangla: data.title_bangla,
    message: data.message,
    message_bangla: data.message_bangla,
    notification_type: 'achievement',
    priority: 'normal',
  });
}
