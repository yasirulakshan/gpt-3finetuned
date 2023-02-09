import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../views/cht/chat"
import FineTune from "../views/finetune/finetune"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/finetune" element={<FineTune />} />
            </Routes>
        </BrowserRouter>
    )


}

export default Router;