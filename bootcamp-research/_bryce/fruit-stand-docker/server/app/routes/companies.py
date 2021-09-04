from flask import Blueprint, request  # jsonify is another function that can convert lists into json
from sqlalchemy.orm import joinedload
from ..models import db
from ..models.companies import Company
from ..auth import require_auth

bp = Blueprint("companies", __name__, url_prefix='/api/companies')

@bp.route('')
# @require_auth
def index():
  companies = Company.query.all()
  companies = [company.to_dict() for company in companies]

  # Sets up a structure of a "companies" key pointing to an array of company objects when it is parsed by React
  return {"companies": companies}
  # Sets up a structure of our array of company objects directly when it is parsed by React
  # return jsonify(companies)


@bp.route('/<int:companyId>')
# @require_auth
def company_items_by_type(companyId):
  company = Company.query.options(joinedload('items')).get(companyId)
  
  items = [item.to_dict() for item in company.items]
  company = company.to_dict()
  payload = {"company": company, "items": items}
  return payload
