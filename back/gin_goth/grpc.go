package main

import (
	"gin_oauth/auth_grpc"
	"log"
	"net"

	"golang.org/x/net/context"
	"google.golang.org/grpc"

	"gin_oauth/auth"
)

func StartGrpc() {
	log.Print("start grpc")

	// 10000番ポートでリッスン
	listen, err := net.Listen("tcp", ":10000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	// gRPCサーバーを起動
	grpcServer := grpc.NewServer()

	// サーバーにサービスを登録
	auth_grpc.RegisterAuthServerServer(grpcServer, &Auth{})

	// サーバーを起動
	if err := grpcServer.Serve(listen); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

	log.Print("end grpc")
}

// Auth サーバー
type Auth struct{}

func (aether *Auth) Auth(
	ctx context.Context,
	token *auth_grpc.AuthToken,
) (*auth_grpc.AuthResult, error) {
	// トークン検証
	token_data, err := auth.ParseToken(token.Token)
	if err != nil {
		return &auth_grpc.AuthResult{Success: false}, err
	}

	// ユーザー情報取得
	user, err := auth.GetUserInfo(token_data.BindId)
	if err != nil {
		return &auth_grpc.AuthResult{Success: false}, err
	}

	// 認証結果
	result := auth_grpc.AuthResult{
		Success: true,
		User: &auth_grpc.User{
			UserID:      user.UserId,
			Name:        user.Name,
			NickName:    user.NickName,
			FirstName:   user.FirstName,
			LastName:    user.LastName,
			AvatarURL:   user.AvatarURL,
			Email:       user.Email,
			Provider:    user.Provider,
			ProviderId:  user.ProviderId,
			Description: user.Description,
		},
	}
	return &result, nil
}

func (aether *Auth) Refresh(
	ctx context.Context,
	token *auth_grpc.AuthToken,
) (*auth_grpc.RefreshResult, error) {
	// トークン検証
	token_data, err := auth.ParseToken(token.Token)
	if err != nil {
		return &auth_grpc.RefreshResult{Success: false}, err
	}
	// トークン更新
	new_token, err := auth.UpdateToken(token_data.TokenId,"")
	if err != nil {
		return &auth_grpc.RefreshResult{Success: false}, err
	}
	return &auth_grpc.RefreshResult{Success: true, Token: new_token}, nil
}
