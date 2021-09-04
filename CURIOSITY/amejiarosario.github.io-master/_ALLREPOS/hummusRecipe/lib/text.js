const LineBreaker = require('linebreak');
const {
    Word,
    Line
} = require('./text.helper');
const {
    htmlToTextObjects
} = require('./htmlToTextObjects');
const xObjectForm = require('./xObjectForm');

/**
 * Write texts
 * @name text
 * @function
 * @todo support break words
 * @memberof Recipe
 * @param {string} text - The text content
 * @param {number} x - The coordinate x
 * @param {number} y - The coordinate y
 * @param {Object} [options] - The options
 * @param {string|number[]} [options.color] - HexColor (#000000 to #ffffff) or RGB (0 to 255)
 * @param {number} [options.opacity] - opacity
 * @param {number} [options.rotation] - Accept: +/- 0 through 360. Default: 0
 * @param {number[]} [options.rotationOrigin] - [originX, originY] Default: the text coordinate
 * @param {string} [options.font] - The font. 'Arial', 'Helvetica'...
 * @param {number} [options.size] - The line width
 * @param {string} [options.align] - The alignment. 'center center'...
 * @param {Object|Boolean} [options.highlight] - Text markup annotation.
 * @param {Object|Boolean} [options.underline] - Text markup annotation.
 * @param {Object|Boolean} [options.strikeOut] - Text markup annotation.
 * @param {Object} [options.textBox] - Text Box to fit in.
 * @param {number} [options.textBox.width] - Text Box width
 * @param {number} [options.textBox.height] - Text Box fixed height
 * @param {number} [options.textBox.minHeight] - Text Box minimum height
 * @param {number|number[]} [options.textBox.padding] - Text Box padding, [top, right, bottom, left]
 * @param {number} [options.textBox.lineHeight] - Text Box line height
 * @param {string} [options.textBox.textAlign] - Text alignment inside text box
 * @param {Object} [options.textBox.style] - Text Box styles
 * @param {number} [options.textBox.style.lineWidth] - Text Box border width
 * @param {string|number[]} [options.textBox.style.stroke] - Text Box border color
 * @param {number[]} [options.textBox.style.dash] - Text Box border border dash style [number, number]
 * @param {string|number[]} [options.textBox.style.fill] - Text Box border background color
 * @param {number} [options.textBox.style.opacity] - Text Box border background opacity
 */
exports.text = function text(text = '', x, y, options = {}) {
    if (!this.pageContext) {
        return this;
    }
    const targetAnnotations = options;
    const originCoord = this._calibrateCoordinate(x, y, 0, 0, this.pageNumber);
    const pathOptions = this._getPathOptions(options, originCoord.nx, originCoord.ny);
    // const { width: pageWidth, height: pageHeight } = this.metadata[this.pageNumber];

    const textObjects = (options.html) ? htmlToTextObjects(text) : [{
        value: text,
        tag: null,
        isBold: options.bold,
        isItalic: options.italic,
        attributes: [],
        styles: {},
        needsLineBreaker: false,
        size: pathOptions.size,
        sizeRatio: 1,
        sizeRatios: [1],
        link: null,
        childs: []
    }];
    const textBox = (!options.textBox) ? {
        // use page width with padding and margin
        isSimpleText: true,
        width: null,
        lineHeight: 0,
        padding: 0,
        minHeight: 0
    } : {
        width: options.textBox.width || 100,
        lineHeight: options.textBox.lineHeight,
        height: options.textBox.height,
        padding: (options.textBox.padding || 0),
        minHeight: options.textBox.minHeight || 0,
        style: options.textBox.style,
        textAlign: options.textBox.textAlign
    };

    textBox.padding = (Array.isArray(textBox.padding)) ? textBox.padding : [textBox.padding];
    Object.assign(textBox, {
        paddingTop: textBox.padding[0],
        paddingRight: textBox.padding[1] || textBox.padding[0],
        paddingBottom: textBox.padding[2] || textBox.padding[0],
        paddingLeft: textBox.padding[2] || textBox.padding[1] || textBox.padding[0],
    });
    let firstLineHeight;
    // let lastLineHeight;

    let totalHeight = 0;
    let toWriteTextObjects = [];

    // const layerIndex = {};

    const writeValue = (textObject) => {
        textObject.lineID = textObject.lineID || Date.now() * Math.random();
        textObject.lineID = (textObject.needsLineBreaker) ? Date.now() * Math.random() : textObject.lineID;
        if (textObject.value) {
            textObject.styles.color = (textObject.styles.color) ?
                this._transformColor(textObject.styles.color) : pathOptions.color;
            const {
                toWriteTextObjects: newToWriteObjects,
                paragraphHeight
            } = getToWriteTextObjects(textObject, pathOptions, textBox);
            toWriteTextObjects = [...toWriteTextObjects, ...newToWriteObjects];
            if (!firstLineHeight) {
                firstLineHeight = toWriteTextObjects[0].lineHeight;
            }
            totalHeight += paragraphHeight; // textObject.size;
        }
        if (textObject.tag && textObject.childs.length) {
            // console.log(textObject);
            if (!textObject.size) {
                textObject.size = pathOptions.size * textObject.sizeRatio;
                textObject.sizeRatios = [textObject.sizeRatio];
            }
            textObject.layer = textObject.layer || 0;
            textObject.layer++;

            textObject.currentIndex = 0;

            textObject.childs.forEach((child) => {
                if (textObject.tag == 'ul') {
                    child.prependValue = '* ';
                    child.layer = textObject.layer + 1;
                    // child.indent = 4 * child.layer;
                }
                if (textObject.tag == 'ol') {
                    if (child.tag != 'ol') {
                        textObject.currentIndex++;
                        child.prependValue = `${(textObject.currentIndex).toString()}. `;
                    }
                    child.layer = textObject.layer + 1;
                    // child.indent = 4 * child.layer;
                }
                if (textObject.tag == 'li') {
                    if (child.tag == 'ol' || child.tag == 'ul') {
                        child.layer = textObject.layer - 1;
                    }
                }
                if (textObject.prependValue) {
                    child.prependValue = (!['ol', 'ul'].includes(textObject.tag)) ?
                        textObject.prependValue : child.prependValue;
                    textObject.indent = 2 * textObject.layer;
                }
                if (textObject.indent) {
                    child.indent = child.indent || textObject.indent;
                }
                if (textObject.size) {
                    child.size = textObject.size * child.sizeRatio;
                    child.sizeRatios = [...textObject.sizeRatios, child.sizeRatio];
                }
                child.styles = Object.assign(child.styles, textObject.styles);

                child.isBold = (textObject.isBold) ? textObject.isBold : child.isBold;
                child.isItalic = (textObject.isItalic) ? textObject.isItalic : child.isItalic;
                child.underline = (textObject.underline) ? textObject.underline : child.underline;

                child.lineID = textObject.lineID;
                writeValue(child);
            });
        }
    };
    textObjects.forEach((textObject) => {
        writeValue(textObject);
    });

    const calculatedHeight = totalHeight + textBox.paddingTop + textBox.paddingBottom;

    if (!textBox.height) {
        textBox.height = calculatedHeight;
        textBox.height = (textBox.minHeight && textBox.minHeight >= textBox.height) ? textBox.minHeight : textBox.height;
    }
    if (!textBox.width) {
        textBox.width = toWriteTextObjects[0].lineWidth;
    }
    textBox.firstLineHeight = firstLineHeight;
    textBox.lastLineHeight = toWriteTextObjects[toWriteTextObjects.length - 1].lineHeight;

    const {
        offsetX,
        offsetY
    } = this._getTextBoxOffset(textBox, pathOptions);
    const {
        nx,
        ny
    } = this._calibrateCoordinate(x, y, offsetX, offsetY);
    if (textBox.style) {
        textBox.height = (textBox.firstLineHeight + 2) * toWriteTextObjects.length;
        this.rectangle(
            nx,
            ny - textBox.height + textBox.firstLineHeight,
            textBox.width, textBox.height, Object.assign(textBox.style, {
                dontTranslate: true,
                rotation: pathOptions.rotation,
                rotationOrigin: [pathOptions.originX, pathOptions.originY],
            })
        );
    }
    const context = this.pageContext;
    // const space = 8;
    let currentY = ny - textBox.paddingTop;
    let currentLineID;
    let currentLineWidth = 0;
    let toWriteContents = [];

    toWriteTextObjects.forEach((toWriteTextObject, index) => {
        const {
            text,
            lineHeight,
            lineWidth,
            lineID,
            spaceWidth
        } = toWriteTextObject;

        currentLineID = currentLineID || lineID;
        const isContinued = (currentLineID == lineID) ? true : false;

        const getStartX = (startX, currentWriteOptions) => {
            let x = startX;
            let offsetX = 0;
            if (currentWriteOptions.align == 'center') {
                offsetX = (textBox.width - currentLineWidth) / 2;
            } else
            if (currentWriteOptions.align == 'right') {
                offsetX = (textBox.width - textBox.paddingRight - currentLineWidth);
            } else {
                offsetX = textBox.paddingLeft;
            }
            return x + offsetX;
        };

        const writeText = (context, x, y, wto) => {
            const options = wto.writeOptions;
            const { lineHeight, lineWidth, text } = wto;

            // write directly to page when not dealing with opacity and rotation.
            if (options.opacity === 1 && options.rotation === 0) {
                context.writeText(text, x, y, options);
            } else {
                // ... otherwise use xObjectForm when rotation or opacity exists
                this.pauseContext();
                // https://github.com/galkahana/HummusJS/wiki/Use-the-pdf-drawing-operators
                const xObject = new xObjectForm(this.writer, lineWidth * 1.5, lineHeight * 2);
                const colorArray = options.colorArray;
                const xObjectItem = xObject
                    .getContentContext()
                    .q()
                    .gs(xObject.getGsName(options.fillGsId))
                    .BT();

                //https://github.com/galkahana/HummusJS/blob/b699d6a01ba027428120cbe5b1c16813bed0521d/src/deps/PDFWriter/AbstractContentContext.h#L235
                switch (colorArray.length) {
                case 1:
                    xObjectItem.g(colorArray[0]);
                    break;
                case 3:
                    xObjectItem.rg(colorArray[0], colorArray[1], colorArray[2]);
                    break;
                case 4:
                    xObjectItem.k(colorArray[0], colorArray[1], colorArray[2], colorArray[3]);
                    break;
                default:
                }

                xObjectItem
                    .Tf(options.font, options.size)
                    .Tm(1, 0, 0, 1, 1, lineHeight)
                    .Tj(text)
                    .ET()
                    .Q();
                xObject.end();
                this.resumeContext();
                this.pageContext.q();

                options.deltaY = lineHeight;
                this._setRotationContext(this.pageContext, x, y, options);

                this.pageContext
                    .doXObject(xObject)
                    .Q();
            }

            const { textHeight } = options;

            for (let key in targetAnnotations) {
                const subtype = this._getTextMarkupAnnotationSubtype(key);
                if (subtype) {
                    const markupOption = (typeof (targetAnnotations[key]) != 'object') ? {} : targetAnnotations[key];
                    Object.assign(markupOption, {
                        height: textHeight * 1.4,
                        width: currentLineWidth,
                        text: markupOption.text || '',
                        _textHeight: textHeight
                    });
                    const {
                        ox,
                        oy
                    } = this._reverseCoordinate(x, y - textHeight * 0.2);
                    this.annot(ox, oy, subtype, markupOption);
                }
            }
        };

        if (!isContinued) {
            toWriteContents.forEach((content) => {
                const x = getStartX(content.startX, content.wto.writeOptions);
                const y = currentY;
                writeText(context, x, y, content.wto);
            });
            toWriteContents = [];
            currentLineID = lineID;
            currentLineWidth = 0;
            currentY -= lineHeight;
        }

        const startX = nx + currentLineWidth;
        if (text != '[@@DONOT_RENDER_THIS@@]') {
            toWriteContents.push({
                startX,
                wto: toWriteTextObject
            });
        }

        currentLineWidth = currentLineWidth + lineWidth + spaceWidth; // space * writeOptions.size / 14;

        // Processing last line?
        if (index == toWriteTextObjects.length - 1) {
            toWriteContents.forEach((content) => {
                const x = getStartX(content.startX, content.wto.writeOptions);
                const y = currentY;
                writeText(context, x, y, content.wto);
            });
        }
    });

    return this;
};

function getToWriteTextObjects(textObject = {}, pathOptions, textBox = {}) {
    const toWriteTextObjects = [];
    let text = ((textObject.prependValue) ? textObject.prependValue : '') +
        textObject.value +
        ((textObject.appendValue) ? textObject.appendValue : '');

    const size = textObject.size || pathOptions.size;
    // Use the same string to get the same height for each string with the same font.
    const textHeight = pathOptions.font.calculateTextDimensions(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ', size
    ).height;

    pathOptions.textHeight = textHeight;
    textBox.lineHeight = textBox.lineHeight || textHeight;

    const breaker = new LineBreaker(text);
    const lines = [];
    const indent = (textObject.indent || 0);
    // const indentWidth = indent * size;
    const lineMaxWidth = (textBox.width) ? textBox.width - textBox.paddingLeft - textBox.paddingRight - indent : null;
    let newLine = new Line(lineMaxWidth, textBox.lineHeight, size, pathOptions);
    let last = 0;
    let bk = breaker.nextBreak();

    for (let i = 0; i < indent; i++) {
        newLine.addWord(new Word(' '));
    }

    while (bk) {
        let nextWord = text.slice(last, bk.position);
        /**
         * Author: silverma (Marc Silverman)
         * #29 Is it possible to add multi-line text?
         * https://github.com/chunyenHuang/hummusRecipe/issues/29
         */
        if (bk.required) {
            nextWord = nextWord.trim();
        }

        const word = new Word(nextWord, pathOptions);
        if (newLine.canFit(word)) {
            newLine.addWord(word);
        } else {
            lines.push(newLine);
            newLine = new Line(lineMaxWidth, textBox.lineHeight, size, pathOptions);
            for (let i = 0; i < indent; i++) {
                newLine.addWord(new Word(' '));
            }
            if (textObject.prependValue) {
                const space = Array(textObject.prependValue.length + 1).fill(' ').join('');
                newLine.addWord(new Word(space));
            }
            newLine.addWord(word);
        }

        /**
         * Author: silverma (Marc Silverman)
         * #29 Is it possible to add multi-line text?
         * https://github.com/chunyenHuang/hummusRecipe/issues/29
         */
        if (bk.required) {
            lines.push(newLine);
            newLine = new Line(lineMaxWidth, textBox.lineHeight, size, pathOptions);
        }
        last = bk.position;
        bk = breaker.nextBreak();
    }
    lines.push(newLine);

    const lineHeightMargin = 0;
    let lineHeight = (textHeight + lineHeightMargin >= textBox.lineHeight) ? textHeight + lineHeightMargin : textBox.lineHeight;
    const writeOptions = Object.assign({}, pathOptions, {
        color: textObject.styles.color,
        opacity: parseFloat(textObject.styles.opacity || pathOptions.opacity || 1),
        underline: textObject.underline || pathOptions.underline,
        size: textObject.size,
        align: textBox.textAlign,
        font: (textObject.isBold && textObject.isItalic) ? pathOptions.fonts.boldItalic : (textObject.isItalic) ? pathOptions.fonts.italic : (textObject.isBold) ? pathOptions.fonts.bold : pathOptions.font
    });
    let paragraphHeight = 0;
    lines.forEach((line, index) => {
        lineHeight = (lineHeight >= line.height) ? lineHeight : line.height;

        toWriteTextObjects.push({
            text: line.value,
            lineID: (index == 0) ? textObject.lineID : Date.now() * Math.random(),
            // @todo: handle line height to mimic html tag
            lineHeight,
            lineWidth: line.currentWidth,
            spaceWidth: line.spaceWidth,
            writeOptions
        });
        paragraphHeight += lineHeight;
    });
    return {
        toWriteTextObjects,
        paragraphHeight
    };
}
