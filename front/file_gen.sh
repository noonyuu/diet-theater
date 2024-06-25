echo "生成したいディレクトリ名を入力してください:"
read dir_name

# ディレクトリが既に存在するか確認
if [ -d "$dir_name" ]; then
  echo "ディレクトリ '$dir_name' は既に存在します。"
else
  # ディレクトリを生成
  cd src/features
  mkdir "$dir_name"
  if [ $? -eq 0 ]; then
    echo "ディレクトリ '$dir_name' を生成しました。"
    cd $dir_name
    mkdir components
    mkdir hooks
    mkdir api
  else
    echo "ディレクトリ '$dir_name' の生成に失敗しました。"
  fi
fi
