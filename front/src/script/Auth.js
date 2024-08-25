// const base_path = "https://diet-theater.noonyuu.com/";
const base_path = "https://localhost:8443/";

// トークンの更新
export const RefreshToken = async () => {
  try {
    const req = await fetch(base_path + "auth/refresh", {
      method: "POST",
    });

    if (req.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

// ログアウト
export const LogOut = async () =>{
  try {
    const req = await fetch(base_path + "auth/logout", {
      method: "POST",
    });

    if (req.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

// ユーザー情報の取得
export const GetUser = async () =>{
  console.log("GetUser");
  try {
    const req = await fetch(base_path + "auth/get-user", {
      method: "POST",
    });

    if (req.status == 200) {
      // ユーザー情報を返す
      return [true, await req.json()];
    } else {
      return [false, null];
    }
  } catch (e) {
    console.log(e);
    return [false, null];
  }
}
