from django.contrib import admin
from .models import Client, Service, Repair, ServiceInstance, Item


class ServiceInstanceInline(admin.TabularInline):
    model = ServiceInstance
    extra = 0


class RepairInline(admin.TabularInline):
    model = Repair
    inlines = [ServiceInstanceInline]
    extra = 0


class ItemInline(admin.TabularInline):
    model = Item
    inlines = [RepairInline]
    extra = 0


class ClientAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'email', 'dziuma_id']
    inlines = [ItemInline]

    def get_form(self, request, obj=None, **kwargs):
        # Exclude dziuma_id from the form
        self.exclude = ['dziuma_id']
        return super().get_form(request, obj, **kwargs)


class ServiceAdmin(admin.ModelAdmin):
    list_display = ['service_name', 'price']


class ServiceInstanceAdmin(admin.ModelAdmin):
    list_display = ['get_service_name', 'get_item_serial_nr']

    def get_service_name(self, obj):
        return obj.service.service_name

    def get_item_serial_nr(self, obj):
        return obj.repair.item.serial_nr
    get_service_name.short_description = 'Service Name'
    get_item_serial_nr.short_description = 'Item Serial Nr.'


class RepairAdmin(admin.ModelAdmin):
    list_display = ['date_received', 'item_serial_nr',
                    'client_dziuma_id', 'status', 'service_fee']
    readonly_fields = ['service_fee',]
    inlines = [ServiceInstanceInline]

    def item_serial_nr(self, obj):
        return obj.item.serial_nr

    def client_dziuma_id(self, obj):
        return obj.item.client.dziuma_id

    def get_service_fee(self, obj):
        return obj.get_service_fee


class ItemAdmin(admin.ModelAdmin):
    list_display = ['item_type', 'name',
                    'get_full_name', 'guarantee', 'serial_nr']

    def get_full_name(self, obj):
        full_name = f"{obj.client.first_name} " \
                    f"{obj.client.last_name}" if obj.client else None
        return full_name
    get_full_name.short_description = 'Client Name'


# Register your models here.
admin.site.register(Client, ClientAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Repair, RepairAdmin)
admin.site.register(ServiceInstance, ServiceInstanceAdmin)
admin.site.register(Item, ItemAdmin)
