const SiteAuditTests = () => {

    const FailMessage = (message) => {
        console.log('%c FAIL ', 'background: lightcoral; color: darkred', message)
    }
    const PassMessage = (message) => {
        console.log('%c PASS ', 'background: darkseagreen; color: darkgreen', message)
    }

    const h1Tags = document.querySelectorAll('h1');
    const h1TagsTest = {
        criteria: "At least one H1 tag present",
        rawData: h1Tags,
        data: h1Tags.length,
        pass: h1Tags.length > 0
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogTitleTest = {
        criteria: "Meta OG Title tag present and has content",
        rawData: ogTitle,
        data: ogTitle != null ? ogTitle.getAttribute('content') : null,
        pass: ogTitle != null && ogTitle.hasAttribute('content') && ogTitle.getAttribute('content').length > 0
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterTitleTest = {
        criteria: "Meta Twitter Title tag present and has content",
        rawData: twitterTitle,
        data: twitterTitle != null ? twitterTitle.getAttribute('content') : null,
        pass: twitterTitle != null && twitterTitle.hasAttribute('content') && twitterTitle.getAttribute('content').length > 0
    }

    const titleTag = document.querySelector('title');
    const titleTagTest = {
        criteria: "Title tag present and has content",
        rawData: titleTag,
        data: titleTag != null ? titleTag.innerText : null,
        pass: titleTag != null && titleTag.innerText.length > 0
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaDescriptionTest = {
        criteria: "Meta description tag present and has content",
        rawData: metaDescription,
        data: metaDescription != null ? metaDescription.getAttribute('content') : null,
        pass: metaDescription != null && metaDescription.hasAttribute('content') && metaDescription.getAttribute('content').length > 0
    }

    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    const imagesWithoutAltTest = {
        criteria: "All images have an alt attribute, even if blank",
        rawData: imagesWithoutAlt,
        data: `${imagesWithoutAlt.length} images without alt attribute`,
        pass: imagesWithoutAlt.length < 1
    }

    // Add all tests to this array
    const AllTests = [h1TagsTest, ogTitleTest, twitterTitleTest, titleTagTest, metaDescriptionTest, imagesWithoutAltTest];
    for (let test of AllTests) {
        test.pass ? PassMessage(test.criteria) : FailMessage(test.criteria);
    }

    return {
        fullResults: {
            h1TagsTest,
            ogTitleTest,
            twitterTitleTest,
            metaDescriptionTest,
            titleTagTest,
            imagesWithoutAltTest
        }
    }
}

SiteAuditTests()
