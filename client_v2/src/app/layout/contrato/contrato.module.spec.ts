import { ContratoModule } from './contrato.module';

describe('ContraoModule', () => {
    let contratoModule: ContratoModule;

    beforeEach(() => {
        contratoModule = new ContratoModule();
    });

    it('should create an instance', () => {
        expect(contratoModule).toBeTruthy();
    });
});
