import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../views/cht/chat"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    )


}

export default Router;