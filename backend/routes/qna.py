from fastapi import APIRouter
from controllers import qna 

router = APIRouter()
router.add_api_route("/{user_id}", qna.create_qna, methods=["POST"])
router.add_api_route("/", qna.get_all_qna, methods=["GET"])
router.add_api_route("/{qna_id}", qna.get_qna_detail, methods=["GET"])
router.add_api_route("/{qna_id}", qna.update_qna, methods=["PUT"])
router.add_api_route("/{qna_id}", qna.delete_qna, methods=["DELETE"])
router.add_api_route("/user/{user_id}", qna.get_user_qna, methods=["GET"])