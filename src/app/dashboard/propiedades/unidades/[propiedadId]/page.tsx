import { PrismaClient, Unidad } from "@prisma/client";
import { getUnidadesPaginadasIdPropiedades } from "@/actions/unidades/unidades-paginadas";
import TablaUnidades from "@/components/Unidades/Tabla";
import { ModalUnidad } from "@/components/Unidades/ModalUnidad";

const prisma = new PrismaClient();
interface Params {
  propiedadId: string;
  id: number;
  unidades: Unidad[];
}

const Unidades = async ({ params }: { params: Params }) => {
  var { propiedadId } = params;
  propiedadId = propiedadId.replace("propiedadesId%3D", "");
  const id = parseInt(propiedadId);
  const unidades = await getUnidadesPaginadasIdPropiedades({
    pagina: 1,
    take: 5,
    propiedadId: id,
  });
  return (
    <>
      <div className="flex justify-center mb-6">
        <ModalUnidad propiedadId={id} />
      </div>
      <TablaUnidades
        paginaActual={unidades.paginaActual}
        cantidadPaginas={unidades.cantidadPaginas}
        totalUnidades={unidades.totalUnidades}
        unidades={unidades.unidades}
      />
    </>
  );
};

export default Unidades;
