from fastapi import APIRouter
from controllers import meal 

router = APIRouter()
router.add_api_route("/calories", meal.get_calories, methods=["POST"])