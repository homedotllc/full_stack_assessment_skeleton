import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  // const allUsers = await prisma.home.findMany()
  // console.log(allUsers)
  await prisma.user_home_mapping.create({
    data: {
      user: {
        create:{
          username: 'user11',
          email: 'user11@example.org'
        }
      },
      home: {
        create:{
          street_address: '3918 Dillan Alley Square 009',
          state: 'Hawaii',
          zip: '04156',
          sqft: 5640.73,
          beds: 7,
          baths: 5,
          list_price: 922613,
        }
      }
    },
  })

  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  export{}