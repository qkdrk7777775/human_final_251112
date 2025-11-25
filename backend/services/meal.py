
import numpy as np 

from networks.calories.model import calories_model

# 게시글 생성
def get_calories(pil_img):
    det_res, vol_res = calories_model.predict(
        pil_img, conf_threshold=0.015)
    if not det_res is None:
        det_res = det_res[det_res[:,-1]!=0]

    idx = [int(i) for i in det_res[:,-1]]
    selected_rows = calories_model.meta_data.loc[idx]
    
    factor = calories_model.qvalues[np.argmax(vol_res)]

    df_numerics = selected_rows.select_dtypes(include=['number']) 
    selected_rows[df_numerics.columns] = df_numerics * factor
    if (det_res is not None and len(det_res) > 0):
        x1, y1, x2, y2, conf = det_res[:,:-1].T.tolist()
        result = {"x1":x1, "y1":y1, "x2":x2, "y2":y2, "confidence":conf}
    else:
        result = {"x1": [], "y1": [], "x2": [], "y2": [], "confidence": []}
    return result, selected_rows.to_dict(orient="records")
