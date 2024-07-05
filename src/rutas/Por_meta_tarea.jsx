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

export const Por_meta_tarea = () => {
  const [metas, setMetas] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [cod_meta, setCod_meta] = useState([]);
  const [cod_tarea, setCod_tarea] = useState([]);
  const [kits, setKits] = useState([]);

  const headers = [
    { title: 'codigo', prop: 'cod_item_fam',isFilterable: true, isSortable: true,wrap: true},
    { title: 'nombre', prop: 'nom_item_fam',isFilterable: true, isSortable: true,wrap: true},
    { title: 'tipo bien', prop: 'tipo_bien', isSortable: true},
    { title: 'nivel', prop: 'nivel', isSortable: true},
    { title: 'tipo calculo', prop: 'tipo_calculo', isSortable: true},
    { title: 'activo', prop: 'activo', isSortable: true},
    { title: 'clasificador', prop: 'clasificador', isSortable: true},
  ];

  //obtener metas
  const get_metas=async()=>{
    try{
      const res = await axios.get(url+'metas');
      setMetas(res.data);
    }catch(error){
      console.error(error);
    }
  }

  //obtener tareas
  const get_tareas=async()=>{
    try{
      const res = await axios.get(url+'tareas'+'/'+cod_meta);
      setTareas(res.data);
    }catch(error){
      console.error(error);
    }
  }

  const get_cod_meta=(event)=>{
    setCod_meta(event.target.value)
  }

  const get_cod_tarea=(event)=>{
    setCod_tarea(event.target.value)
  }

  const get_kit_meta_tarea=async()=>{
    try{
      const res = await axios.get(url+'kit_meta_tarea'+'/'+cod_meta+'/'+cod_tarea);
      setKits(res.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    get_metas();
  },[]);

  useEffect(()=>{
    get_kit_meta_tarea();
  },[cod_tarea]);

  useEffect(()=>{
    get_tareas();
  },[cod_meta]);

  return (
    <>
    <div className='grid-meta'>
      <main className='main'>

      <div className='container-fluid'>
      <div className='row border p-3 shadow p-3 m-3 rounded'>
        <div className='col-1 p-1 text-end'>
          Metas
        </div>
        <div className='col-3'>
          <select name="meta" className='form-select form-select-md' onChange={get_cod_meta}>
          <option value='-1'>Seleccione una meta</option>
          {
              metas.map(mt=>(
              <option key={mt.cod_meta} value={mt.cod_meta}>
                  {mt.meta}
              </option>
              ))
          }
          </select>
        </div>

        <div className='col-2 p-1 text-end'>
          Sub Finalidad/Tarea
        </div>
        <div className='col-6'>
          <select name="meta" className='form-select form-select-md' onChange={get_cod_tarea}>
          <option value='-1'>Seleccione una tarea</option>
          {
              tareas.map(tr=>(
              <option key={tr.cod_sub_finalidad} value={tr.cod_sub_finalidad}>
                  {tr.sub_finalidad}
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
