const icon_img = document.getElementById("icon_img");

const get_user = document.getElementById("get-user");

get_user.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const user_info = await GetUser();

  if (user_info) {
    console.log(user_info);
    icon_img.src = user_info[1].avatar_url;
  }
});


getuser_button.click();

async function main() {
  const user_info = await GetUser();
  console.log(user_info[0]);
  console.log(await RefreshToken());
}

main();
