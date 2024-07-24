// components/ResponsiveTable.js
import Loading from './loading'
import styles from './style.module.css'

interface Earning {
  id: number
  date: string
  amount: number
  platform: string
}

interface EarningProps {
  data: Earning[]
}

function formatISODateToBrazilian(dateString: string) {
  const date = new Date(dateString)

  // Obter o dia, mês e ano
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Janeiro é 0!
  const year = date.getFullYear()

  // Retornar a data formatada
  return `${day}/${month}/${year}`
}

const ResponsiveTable: React.FC<EarningProps> = ({ data }) => {
  // const data = [
  //   { dia: 'Segunda', valor: 'R$100', plataforma: 'Plataforma A' },
  //   { dia: 'Terça', valor: 'R$150', plataforma: 'Plataforma B' },
  //   { dia: 'Quarta', valor: 'R$200', plataforma: 'Plataforma C' },
  //   // Adicione mais dados conforme necessário
  // ]

  return (
    <div className={styles.tableContainer}>
      <table className={styles.responsiveTable}>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Valor</th>
            <th>Plataforma</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{formatISODateToBrazilian(item.date)}</td>
              <td>{item.amount}</td>
              <td>{item.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResponsiveTable
