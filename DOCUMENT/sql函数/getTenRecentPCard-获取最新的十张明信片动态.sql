CREATE DEFINER=`root`@`localhost` PROCEDURE `getTenRecentPCard`()
BEGIN
SELECT
	cardId,
	cardPic,
	cardReceiveTime,
	cardLike
FROM
	postcard
WHERE
	cardReceiveTime IS NOT NULL
	AND cardPic IS NOT NULL
ORDER BY
	cardReceiveTime DESC
	LIMIT 12;

END