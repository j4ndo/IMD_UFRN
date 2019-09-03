import { ProjetoModule } from './projeto.module';

describe('ProjetoModule', () => {
    let projetoModule: ProjetoModule;

    beforeEach(() => {
        projetoModule = new ProjetoModule();
    });

    it('should create an instance', () => {
        expect(projetoModule).toBeTruthy();
    });
});
