from fastapi import APIRouter

from controllers import attendance

router = APIRouter()
router.add_api_route("/{post_id}",attendance.create_comment, methods=["POST"])
router.add_api_route("/{post_id}",attendance.get_comment_by_post_id, methods=["GET"])