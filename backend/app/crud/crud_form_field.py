from .base import CRUDBase
from app.models.form_field import FormFieldCreate, FormField, FormFieldUpdate


class CRUDFormField(CRUDBase[FormField, FormFieldCreate, FormFieldUpdate]):
    pass


crud_form_field = CRUDFormField(FormField, FormFieldCreate, FormFieldUpdate)
