import React from 'react'
import axios from 'axios'
import './Estilo_rutas.css'
import { useState, useEffect } from 'react'
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const url='http://192.168.1.2/api/api_kit_php/';
let firstPage='<<';
let lastPage='>>';
let nextPage='>';
let prevPage='<';
let texto='Ingrese texto a buscar...';
let beforeSelect='Registros Por pagina';
let afterSelect='';

export const Por_clasificador = () => {
  const [clasificador, setClasificador] = useState([]);
  const [cod_clasif, setCod_clasif] = useState([]);
  const [kits, setKits] = useState([]);

  const headers = [
    { title: 'Codigo', prop: 'cod_item_fam',isFilterable: true, isSortable: true,wrap: true},
    { title: 'Nombre', prop: 'nom_item_fam',isFilterable: true, isSortable: true,wrap: true},
    { title: 'Tipo bien', prop: 'tipo_bien', isSortable: true},
    { title: 'Nivel', prop: 'nivel', isSortable: true},
    { title: 'Tipo calculo', prop: 'tipo_calculo', isSortable: true},
    { title: 'Activo', prop: 'activo', isSortable: true},
    { title: 'Programa', prop: 'programa', isSortable: true},
    { title: 'Meta', prop: 'meta', isSortable: true},
    { title: 'Sub finalidad', prop: 'sub_finalidad', isSortable: true},
  ];

  //obtener metas
  const get_clasificador=async()=>{
    try{
      const res = await axios.get(url+'clasificadores');
      setClasificador(res.data);
    }catch(error){
      console.error(error);
    }
  }

  const get_cod_clasificador=(event)=>{
    setCod_clasif(event.target.value)
  }

  const get_kit_clasificador=async()=>{
    try{
      const res = await axios.get(url+'kit_clasificador'+'/'+cod_clasif);
      setKits(res.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    get_clasificador();
  },[]);

  useEffect(()=>{
    get_kit_clasificador();
  },[cod_clasif]);

  return (
    <>
    <div className='grid-meta'>
      <main className='main'>

      <div className='container-fluid'>
      <div className='row border p-3 shadow p-3 m-3 rounded'>
        <div className='col-2 p-1 text-end'>
          Clasificadores
        </div>
        <div className='col-10'>
          <select name="clasificador" className='form-select form-select-md' onChange={get_cod_clasificador}>
          <option value='-1'>Seleccione un clasificador</option>
          {
              clasificador.map(clf=>(
              <option key={clf.cod_clasificador} value={clf.cod_clasificador}>
                  {clf.clasificador}
              </option>
              ))
          }
          </select>
        </div>
      </div>

      <div className='row border p-3 shadow p-3 m-3 rounded'>
        <DatatableWrapper body={kits} headers={headers}
          paginationOptionsProps={{
            initialState: {
              rowsPerPage: 10,
              options: [5, 10, 15, 20],
            },
            
          }}
        >
        <Row className="mb-4">
          <Col
            xs={12}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
            
          >
          <Filter placeholder={texto} />
            
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
          >
            <PaginationOptions
            alwaysShowPagination
            labels={{ afterSelect, beforeSelect }}
            />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            
            <Pagination
              alwaysShowPagination
              paginationRange={5}
              labels={{ firstPage, lastPage, nextPage, prevPage }}
            />
            
          </Col>
        </Row>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
        </DatatableWrapper>
            
        </div>



          </div>


      </main>
      <footer className='footer'>(c) derechos reservados Red Cusco Norte</footer>
    </div>
    </>
  )
}
