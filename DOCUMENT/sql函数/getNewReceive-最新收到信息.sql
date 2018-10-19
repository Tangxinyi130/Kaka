CREATE DEFINER=`root`@`localhost` PROCEDURE `getNewReceive`()
BEGIN
	SELECT
	from1.cardId,
	from1.userId AS cardSenderId,
	from1.userNickname cardSenderName,
	from1.cardSendRegion,
	from1.userHeadPic AS senderHeadPic,
	from1.cardReceiver AS cardReceiverId,
	userinfo.userNickname AS cardReceiverName,
	userinfo.userHeadPic AS receiverHeadPic,
	from1.cardReceiveRegion,
	from1.cardSendTime,
	from1.cardReceiveTime,
	'收到' AS state
FROM
	(
	SELECT
		userId,
		userNickname,
		cardSendRegion,
		cardReceiver,
		userHeadPic,
		cardId,
		cardSendTime,
		cardReceiveRegion,
		cardReceiveTime
	FROM
		postcard pd
		LEFT JOIN userinfo ui ON pd.cardSender = ui.userId
	) AS from1
	LEFT JOIN userinfo ON from1.cardReceiver = userinfo.userId
WHERE
	from1.cardReceiveTime > DATE_SUB( NOW( ), INTERVAL 2 DAY )
ORDER BY
	from1.cardReceiveTime DESC;
END