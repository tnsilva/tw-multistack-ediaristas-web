import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';
import { Button, Typography, Container, CircularProgress } from '@material-ui/core';
import {
  FormElementContainer,
  PofissionaisPaper,
  ProfissionaisContainer
} from '@styles/pages/index.style';
import useIndex from 'data/hooks/pages/useIndex.page';


export default function Home() {
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes
  } = useIndex();

  return (
    <div >
      <SafeEnvironment />
      <PageTitle 
        title={'Conheça os profissionais'}
        subtitle={ <h2>Preencha seu endereço e veja todos os profissionais da sua região</h2>}     
      />

      <Container>
        <FormElementContainer>
          <TextFieldMask
            mask={'99.999-999'}
            label={'Digite seu CEP'}
            fullWidth
            variant={'outlined'}
            value={cep}
            onChange={(event) => setCep(event.target.value)}
          />
          {cepValido}

          {erro && <Typography color={'error'}>{erro}</Typography>}

          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ width: '220px' }}
            disabled={!cepValido || carregando}
            onClick={() => buscarProfissionais(cep)}
          >
            {carregando? <CircularProgress size={ 20}/> : 'Buscar'}
          </Button>
        </FormElementContainer>

        {buscaFeita &&
          (diaristas.length > 0 ?
          <PofissionaisPaper>
            <ProfissionaisContainer>
              
              {diaristas.map((item, index) => {
                return (
                  <UserInformation
                    key={index}
                    name={item.nome_completo}
                    picture={item.foto_usuario}
                    rating={item.reputacao}
                    description={item.cidade}
                  />
                );
              })}
            </ProfissionaisContainer>

            <Container sx={{ textAlign: 'center' }} >
              {diaristasRestantes > 0 && (
                <Typography sx={{mt: 5}}>
                  ... e mais {diaristasRestantes}{' '}
                  {diaristasRestantes > 1
                    ? 'profissionais atendem'
                    : 'profissional atende'}{' '}
                  o seu endereço.
                </Typography>
              )}

              <Button
                variant={'contained'}
                color={'secondary'}
                sx={{mt: 5}}
              >
                Contratar um profissional
              </Button>
            </Container>
          </PofissionaisPaper>
          :
          (
            <Typography align={'center'} color={'textPrimary'}>
              Ainda não temos nenhuma diarista em sua região.
            </Typography>
          )
        )}

        
      </Container>        
    </div>
  )
}
