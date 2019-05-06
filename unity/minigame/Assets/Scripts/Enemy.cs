﻿using UnityEngine;

/// 敵
public class Enemy : Token
{
    /// 開始
    void Start()
    {
        // サイズを設定
        SetSize(SpriteWidth / 2, SpriteHeight / 2);

        // ランダムな方向に移動する
        // 方向をランダムに決める
        float dir = Random.Range(0, 359);
        // 速さは2
        float spd = 2;
        SetVelocity(dir, spd);
    }

    /// 更新
    void Update()
    {
        // カメラの左下座標を取得
        Vector2 min = GetWorldMin();
        // カメラの右上座標を取得する
        Vector2 max = GetWorldMax();

        if (X < min.x || max.x < X)
        {
            // 画面外に出たので、X移動量を反転する
            VX *= -1;
            // 画面内に移動する
            ClampScreen();
        }
        if (Y < min.y || max.y < Y)
        {
            // 画面外に出たので、Y移動量を反転する
            VY *= -1;
            // 画面内に移動する
            ClampScreen();
        }
    }

    /// クリックされた
    void OnMouseDown()
    {
        // 破棄する
        DestroyObj();
    }
}