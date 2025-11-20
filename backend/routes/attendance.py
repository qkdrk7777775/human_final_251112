from fastapi import APIRouter

from controllers import attendance

router = APIRouter()
router.add_api_route("/{post_id}",attendance.create_attendance, methods=["POST"])
router.add_api_route("/{post_id}",attendance.get_attendance_by_user_id, methods=["GET"])