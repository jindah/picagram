from rest_framework import generics, permissions, filters
from PICAGRAM.permissions import IsNotificationOwner
from .models import Notification
from .serializers import NotificationSerializer


class NotificationList(generics.ListAPIView):
    """List a user's notifications. No create view, since notifications are
    automatically created.
    """

    serializer_class = NotificationSerializer

    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "is_read"]
    

    def get_queryset(self):
        return Notification.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve or delete a notification by id.
    Restricted to notification owner.
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsNotificationOwner]
