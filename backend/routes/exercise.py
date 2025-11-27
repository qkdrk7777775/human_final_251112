from fastapi import APIRouter, Depends

from controllers import exercise
# from utils import verify_token

router = APIRouter()
router.add_api_route("/",exercise.create_exercise, methods=["POST"])
router.add_api_route("/",exercise.get_exercies, methods=["GET"])
router.add_api_route("/{ex_id}",exercise.get_exercies_by_ex_id, methods=["GET"])
router.add_api_route("/{ex_id}",exercise.update_exercise_by_ex_id, methods=["PUT"])
router.add_api_route("/{ex_id}",exercise.delete_exercise_by_ex_id, methods=["DELETE"])