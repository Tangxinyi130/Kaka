CREATE DEFINER=`root`@`localhost` PROCEDURE `getRankingSend`()
BEGIN
	SELECT
	userId,
	userNickname,
	userCity,
	userHeadPic,
	receiverNum,
	( @rowno := @rowno + 1 ) AS ranking
FROM
	(
	SELECT
		userinfo.userId,
		userinfo.userNickname,
		userinfo.userCity,
		userinfo.userHeadPic,
		result.receiverNum
	FROM
		userinfo
		JOIN (
		SELECT
			pdAll.cardReceiver AS cardReceiver,
			COUNT( pdAll.cardReceiver ) AS receiverNum
		FROM
			( SELECT cardReceiver FROM postcard WHERE cardReceiveTime IS NOT NULL ) AS pdAll
		GROUP BY
			pdall.cardReceiver
		) AS result ON userinfo.userId = result.cardReceiver
	) AS a,
	( SELECT ( @rowno := 0 ) ) b
ORDER BY
	receiverNum DESC
	LIMIT 100;

END