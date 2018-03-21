module.exports = class Slugifier {
  /**
   * slugifySpace: used in slugify function
   * @var RegExp
   */
  static get slugifySpaces() { return new RegExp(' [ ]{0,5}', 'g'); };

  /**
   * invalidSlugChars: just a regex to simplify slugs, doesn't reflect RFC 3986 URI standard
   * @var RegExp
   */
  static get invalidSlugChars() { return new RegExp('(?:[^a-zA-Z0-9\-])*', 'g'); }

  static slugify(value) {
    return value.trim().toLowerCase()
      .replace(Slugifier.slugifySpaces, '-')
      .replace(Slugifier.invalidSlugChars, '');
  }
}
