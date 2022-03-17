from .base import CRUDBase
from app.models.form import FormCreate, Form, FormUpdate


class CRUDForm(CRUDBase[Form, FormCreate, FormUpdate]):
    pass


crud_form = CRUDForm(Form, FormCreate, FormUpdate)
