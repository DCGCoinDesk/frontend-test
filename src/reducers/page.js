import { combineReducers } from "redux";

function title(state = "CoinDesk", action) {
  switch (action.type) {
    case "PAGE_UPDATE":
      let { title } = action.payload;
      if (title) {
        try {
          document.querySelector("title").text = title;
        } catch (err) {
          console.log(err);
        }
        return title;
      }
    default:
      return state;
  }
}

export const page = combineReducers({
  title
});
