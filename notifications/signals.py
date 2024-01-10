from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Notification
from likes.models import Like
from comments.models import Comment
from follows.models import Follow
from posts.models import Post


def create_notification(**kwargs):
    Notification.objects.create(
        owner=kwargs["owner"],
        sender=kwargs["sender"],
        category=kwargs["category"],
        item_id=kwargs["item_id"],
        title=kwargs["title"],
        content=kwargs["content"],
    )


# Instructions for signals from:
# https://www.geeksforgeeks.org/how-to-create-and-use-signals-in-django/
@receiver(post_save, sender=Like)
def create_like_notification(sender, instance, created, **kwargs):
    if created:
        data = {
            "owner": instance.post.owner,
            "sender": instance.owner,
            "category": "like",
            "item_id": instance.post.id,
            "title": "You have a new like!",
            "content": f"{instance.owner.username} liked your post "
            f"{instance.post.title}",
        }

        create_notification(**data)


@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance, created, **kwargs):
    if created:
        data = {
            "owner": instance.post.owner,
            "sender": instance.owner,
            "category": "comment",
            "item_id": instance.post.id,
            "title": "You have a new comment!",
            "content": f"{instance.owner.username} commented on your post "
            f"{instance.post.title}",
        }

        create_notification(**data)


@receiver(post_save, sender=Follow)
def create_follow_notification(sender, instance, created, **kwargs):
    if created:
        data = {
            "owner": instance.followed,
            "sender": instance.owner,
            "category": "follow",
            "item_id": instance.id,
            "title": "You have a new follower!",
            "content": f"{instance.owner.username} is now following you.",
        }

        create_notification(**data)


@receiver(post_save, sender=Post)
def create_new_post_notification(sender, instance, created, **kwargs):
    if created:
        recipients = User.objects.filter(following__followed=instance.owner)
        for recipient in recipients:
            data = {
                "owner": recipient,
                "sender": instance.owner,
                "category": "new_post",
                "item_id": instance.id,
                "title": "You have a new post!",
                "content": f"{instance.owner.username} uploaded a new post.",
            }

            create_notification(**data)
