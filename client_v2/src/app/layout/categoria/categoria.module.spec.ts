import { CategoriaModule } from './categoria.module';

describe('ProjetoModule', () => {
    let categoriaModule: CategoriaModule;

    beforeEach(() => {
        categoriaModule = new CategoriaModule();
    });

    it('should create an instance', () => {
        expect(categoriaModule).toBeTruthy();
    });
});
