function sendMail() {
    Logger.log('sendMail() start');

    // 設定
    var subject = 'なみなみレンタルリストのメンバー登録申請';
    var body
        = 'なみなみレンタルリストにメンバー登録申請がありました。\n\n'
    var footer = '';
    var owner = 'AAAAA@gmail.com';
    var editors = 'BBBBB@gmail.com,CCCCC@gmail.com';
    var to = owner + ',' + editors;

    try {
        // スプレッドシートの操作
        var sh   = SpreadsheetApp.getActiveSheet();
        var rows = sh.getLastRow();
        var rg   = sh.getDataRange();


        // メール件名・本文作成と送信先メールアドレス取得
        for (var j = 1; j <= 5; j++ ) {
            var colName  = rg.getCell(2, j).getValue();    // カラム名
            var colValue = rg.getCell(rows, j).getValue(); // 入力値
            body += colName + ': ' + colValue + "\n";
        }

        body += footer;

        // メール送信
        MailApp.sendEmail(to, subject, body);

    } catch(e) {
        MailApp.sendEmail(owner, 'メール送信エラー' + '\n' + 'メール送信中にエラーが発生', e.message);
    }
}
