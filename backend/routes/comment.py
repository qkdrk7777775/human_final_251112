from fastapi import APIRouter

from controllers import comment

router = APIRouter()
router.add_api_route("/",comment.create_comment, methods=["POST"])
router.add_api_route("/{post_id}",comment.get_comment_by_post_id, methods=["GET"])
router.add_api_route("/{comment_id}",comment.update_comment_by_id, methods=["PUT"])
router.add_api_route("/{comment_id}",comment.delete_comment_by_id, methods=["DELETE"])