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
            <div className="my-8 flex w-full justify-center">
              <Form title="ID" />
            </div>
            <div className="my-8 flex w-full justify-center">
              <Form title="パスワード" />
            </div>
            <div className="flex justify-center my-8">
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
