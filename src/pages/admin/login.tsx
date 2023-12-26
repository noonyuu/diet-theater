import { useNavigate } from "react-router-dom";
import { Form } from "../../component/form";
import { Button } from "../../component/button";

export const LoginPage = () => {
  const navigate = useNavigate();
  const router = () => {
    navigate("/login");
  };

  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className="h-[60vh] w-[80vw] border border-black md:w-[50vw]">
          <form
            action=""
            className="flex h-full flex-col items-center justify-center py-16"
          >
            <div className="my-8  w-full ">
              <label className=" ml-[10%] text-left" htmlFor="id">
                ID
              </label>
              <Form title="ID" label="id" />
            </div>
            <div className="my-8  w-full ">
              <label className=" ml-[10%] text-left" htmlFor="password">
                Password
              </label>
              <Form title="パスワード" label="password" />
            </div>
            <div className="my-8 flex justify-center">
              <Button
                name="ログイン"
                color="bg-main-color"
                action=""
                decoration="rounded-lg text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
