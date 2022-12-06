import { isUnique, findMarker } from './index'

const mockInput = [
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
]

describe('Given a datastream buffer', () => {
  describe('When parsing the contents', () => {
    test('Then it should idenitfy if 4 characters are unique', () => {
      expect(isUnique(mockInput[0].slice(0, 4))).toBeFalsy()
      expect(isUnique(mockInput[0].slice(3, 7))).toBeTruthy()
    })
  })
  describe('When iterating over the string', () => {
    const test0 = findMarker(mockInput[0], 4)
    const test1 = findMarker(mockInput[1], 4)
    const test2 = findMarker(mockInput[2], 4)
    const test3 = findMarker(mockInput[3], 4)
    test('Then it should return the index and value of unique characters', () => {
      expect(test0).toEqual(5)
      expect(test1).toEqual(6)
      expect(test2).toEqual(10)
      expect(test3).toEqual(11)
    })
  })
})
