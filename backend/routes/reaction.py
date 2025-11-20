from fastapi import APIRouter

from controllers import reaction

router = APIRouter()
router.add_api_route("/",reaction.create_post_reaction, methods=["POST"])
router.add_api_route("/{post_id}",reaction.read_post_reactions, methods=["GET"])
router.add_api_route("/",reaction.update_post_reaction, methods=["PUT"])
router.add_api_route("/",reaction.delete_post_reaction, methods=["DELETE"])
