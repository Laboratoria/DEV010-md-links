const extractMarkdownLinks = (content, route) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    links.push({ linkText, href: linkUrl, file: route });
  }

  return links;
};

module.exports = extractMarkdownLinks;
