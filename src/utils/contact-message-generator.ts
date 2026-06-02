export function contactMessageGenerator({
  customScrapLocation,
  email,
  firstName,
  lastName,
  location,
  message,
  phone,
  scrapLocation,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  scrapLocation: string;
  customScrapLocation: string;
  message: string;
}) {
  const contactMessage = `
Hello team,

This is ${firstName} ${lastName},

I have a scrap at  ${customScrapLocation.length === 0 ? scrapLocation : customScrapLocation}.

My location is ${location}.

You can conact me through mobile ${phone} or email ${email}.

${
  message.length
    ? `_______________________
${message}
`
    : ""
}
`;

  return contactMessage;
}
