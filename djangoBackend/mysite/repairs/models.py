from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import random
import string


class Client(models.Model):
    dziuma_id = models.CharField(max_length=255, unique=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, null=True)
    phone = models.IntegerField(unique=True, null=True)
    email = models.EmailField(null=True)
    date_created = models.DateField(auto_now_add=True)

    def generate_unique_id(self, length=10):
        characters = string.ascii_letters + string.digits
        unique_id = ''.join(random.choice(characters) for _ in range(length))
        return unique_id

    def save(self, *args, **kwargs):
        if not self.dziuma_id:  # Only generate the ID if it's not set
            self.dziuma_id = self.generate_unique_id()
            print(f"Generated dziuma_id: {self.dziuma_id}")
        super().save(*args, **kwargs)

    @classmethod
    def create(cls, first_name, last_name, phone, email):
        dziuma_id = cls.generate_unique_id()
        return cls.objects.create(
            dziuma_id=dziuma_id,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            email=email
        )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone})"
    
    class Meta:
        ordering = ["-date_created"]


class Service(models.Model):
    service_name = models.CharField(max_length=255)
    price = models.FloatField()

    def __str__(self):
        return f"{self.service_name} - {self.price}"


class Repair(models.Model):
    STATUS_CHOICES = [
        (1, "Waiting"),
        (2, "In progress"),
        (3, "Done"),
    ]

    item = models.ForeignKey("Item", on_delete=models.CASCADE)
    extra_fee = models.FloatField()
    comment = models.TextField()
    status = models.IntegerField(choices=STATUS_CHOICES)
    date_received = models.DateTimeField(auto_now_add=True)
    date_returned = models.DateTimeField(null=True, blank=True)

    service_fee = models.FloatField(blank=True, null=True, default=0)

    def get_service_fee(self):
        if self.pk is not None:
            return sum(
                service_instance.service.price
                for service_instance in self.serviceinstance_set.all()
            )
        return 0

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.service_fee = self.get_service_fee()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.date_received} - " \
                f"{self.item.serial_nr} - " \
                f"{self.item.client.last_name} (status: {self.status})"

    class Meta:
        ordering = ["-date_received"]


class ServiceInstance(models.Model):
    service = models.ForeignKey("Service", on_delete=models.CASCADE)
    repair = models.ForeignKey("Repair", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.repair.item.serial_nr} ({self.service.service_name})"


class Item(models.Model):
    item_type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    serial_nr = models.CharField(max_length=255)
    guarantee = models.BooleanField(null=True)
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, related_name="items")

    def __str__(self):
        return f"{self.item_type} - {self.client.dziuma_id}\
            ({self.client.last_name})"


@receiver(post_save, sender=ServiceInstance)
def update_service_fee(sender, instance, **kwargs):
    # service_fee updates when ServiceInstance is saved

    repair_instance = instance.repair
    if repair_instance:
        repair_instance.get_service_fee()
        repair_instance.save()
