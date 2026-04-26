export interface WordEntry {
  word: string;
  hint: string;
}

export const WORD_BANK: Record<'beginner' | 'intermediate' | 'advanced', WordEntry[]> = {
  beginner: [
    // 4 Letters
    { word: 'BIRD', hint: 'Animal that flies' },
    { word: 'FISH', hint: 'Animal that swims' },
    { word: 'DOOR', hint: 'You open it to enter a room' },
    { word: 'BOOK', hint: 'You read it' },
    { word: 'TREE', hint: 'It has leaves and branches' },
    { word: 'STAR', hint: 'It shines in the night sky' },
    { word: 'MOON', hint: 'Earth\'s natural satellite' },
    { word: 'SUNS', hint: 'A star that gives us light' },
    { word: 'TIME', hint: 'Measured by a clock' },
    { word: 'MILK', hint: 'White liquid from cows' },
    { word: 'FIRE', hint: 'It is hot and burns' },
    { word: 'COLD', hint: 'Opposite of hot' },
    { word: 'BLUE', hint: 'The color of the sky' },
    { word: 'KING', hint: 'Ruler of a kingdom' },
    { word: 'LOVE', hint: 'A strong feeling of affection' },
    { word: 'PLAY', hint: 'To engage in an activity for enjoyment' },
    { word: 'SING', hint: 'To make musical sounds with the voice' },
    { word: 'WALK', hint: 'To move on foot' },
    { word: 'JUMP', hint: 'To push oneself off the ground' },
    { word: 'EASY', hint: 'Not difficult' },
    { word: 'FAST', hint: 'Moving quickly' },
    { word: 'SLOW', hint: 'Not fast' },
    { word: 'GOOD', hint: 'Having the required qualities' }
  ],
  intermediate: [
    // 5 Letters
    { word: 'APPLE', hint: 'A red or green fruit' },
    { word: 'HOUSE', hint: 'A building for human habitation' },
    { word: 'WATER', hint: 'Clear liquid you drink' },
    { word: 'SMART', hint: 'Having or showing quick intelligence' },
    { word: 'WORLD', hint: 'The earth, together with all of its countries and peoples' },
    { word: 'HAPPY', hint: 'Feeling or showing pleasure or contentment' },
    { word: 'LIGHT', hint: 'The natural agent that stimulates sight and makes things visible' },
    { word: 'PLANT', hint: 'A living organism such as trees, shrubs, herbs, grasses, ferns, and mosses' },
    { word: 'TRAIN', hint: 'A series of railway carriages or wagons moved as a unit by a locomotive' },
    { word: 'BREAD', hint: 'Food made of flour, water, and yeast mixed together and baked' },
    { word: 'SMILE', hint: 'A pleased, kind, or amused facial expression' },
    { word: 'MUSIC', hint: 'Vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion' },
    { word: 'NIGHT', hint: 'The period from sunset to sunrise' },
    { word: 'HEART', hint: 'A hollow muscular organ that pumps the blood through the circulatory system' },
    { word: 'EARTH', hint: 'The planet on which we live' },
    { word: 'MONEY', hint: 'A current medium of exchange in the form of coins and banknotes' },
    { word: 'DREAM', hint: 'A series of thoughts, images, and sensations occurring in a person\'s mind during sleep' },
    { word: 'CHAIR', hint: 'A separate seat for one person, typically with a back and four legs' },
    { word: 'TABLE', hint: 'A piece of furniture with a flat top and one or more legs' },
    { word: 'RIVER', hint: 'A large natural stream of water flowing in a channel to the sea, a lake, or another such stream' },
    { word: 'OCEAN', hint: 'A very large expanse of sea, in particular, each of the main areas into which the sea is divided geographically' },
    { word: 'BEACH', hint: 'A pebbly or sandy shore, especially by the sea between high and low water marks' },
    { word: 'STORM', hint: 'A violent disturbance of the atmosphere with strong winds and usually rain, thunder, lightning, or snow' }
  ],
  advanced: [
    // 6+ Letters
    { word: 'BANANA', hint: 'A long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe' },
    { word: 'FAMILY', hint: 'A group of one or more parents and their children living together as a unit' },
    { word: 'ANIMAL', hint: 'A living organism that feeds on organic matter, typically having specialized sense organs and nervous system and able to respond rapidly to stimuli' },
    { word: 'SYSTEM', hint: 'A set of connected things or parts forming a complex whole' },
    { word: 'NUMBER', hint: 'An arithmetical value, expressed by a word, symbol, or figure, representing a particular quantity and used in counting and making calculations' },
    { word: 'PEOPLE', hint: 'Human beings in general or considered collectively' },
    { word: 'SCHOOL', hint: 'An institution for educating children' },
    { word: 'FRIEND', hint: 'A person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations' },
    { word: 'FOREST', hint: 'A large area covered chiefly with trees and undergrowth' },
    { word: 'GARDEN', hint: 'A piece of ground adjoining a house, in which grass, flowers, and shrubs may be grown' },
    { word: 'NATURE', hint: 'The phenomena of the physical world collectively, including plants, animals, the landscape, and other features and products of the earth' },
    { word: 'BEAUTY', hint: 'A combination of qualities, such as shape, color, or form, that pleases the aesthetic senses, especially the sight' },
    { word: 'FUTURE', hint: 'The time or a period of time following the moment of speaking or writing; time regarded as still to come' },
    { word: 'MEMORY', hint: 'The faculty by which the mind stores and remembers information' },
    { word: 'TRAVEL', hint: 'Make a journey, typically of some length' },
    { word: 'PLANET', hint: 'A celestial body moving in an elliptical orbit round a star' },
    { word: 'ENERGY', hint: 'The strength and vitality required for sustained physical or mental activity' },
    { word: 'WONDER', hint: 'A feeling of amazement and admiration, caused by something beautiful, remarkable, or unfamiliar' },
    { word: 'SILENT', hint: 'Not making or accompanied by any sound' },
    { word: 'LISTEN', hint: 'Give one\'s attention to a sound' },
    { word: 'WISDOM', hint: 'The quality of having experience, knowledge, and good judgement' },
    { word: 'STRONG', hint: 'Having the power to move heavy weights or perform other physically demanding tasks' },
    { word: 'SUMMER', hint: 'The warmest season of the year' }
  ]
};
