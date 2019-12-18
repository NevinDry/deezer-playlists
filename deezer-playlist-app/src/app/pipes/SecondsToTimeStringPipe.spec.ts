import { MinuteSecondsPipe } from 'src/app/pipes/SecondsToTimeStringPipe';

describe('MinuteSecondsPipe Unit Test', () => {
    let pipe: MinuteSecondsPipe;
  
    beforeEach(() => {
      pipe = new MinuteSecondsPipe();
    });

    it('Should transform 40 seconds into 00:0:40', () => {
        expect(pipe.transform(40)).toMatch('00:00:40');
    });

    it('Should transform 245 seconds into 00:04:05', () => {
        expect(pipe.transform(245)).toMatch('00:04:05');
    });

    it('Should transform 3665 seconds into 00:04:05', () => {
        expect(pipe.transform(3665)).toMatch('01:01:05');
    });

  });