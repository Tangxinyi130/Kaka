CREATE DEFINER=`root`@`localhost` PROCEDURE `getTenRecentPCard`()
BEGIN
SELECT
	cardId,
	cardPic,
	cardReceiveTime
FROM
	postcard
WHERE
	cardReceiveTime IS NOT NULL
	AND cardPic IS NOT NULL
ORDER BY
	cardReceiveTime DESC
	LIMIT 10;

END