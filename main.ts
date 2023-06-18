import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const list = await prisma.$queryRaw`
    SELECT
      id, "personId", 1 - (embedding <=> (SELECT embedding FROM "FaceEmbedding" WHERE id = 6)) AS cosine_similarity
    FROM
      "FaceEmbedding"
    ORDER BY
      embedding <=> (SELECT embedding FROM "FaceEmbedding" WHERE id = 6)
  `
  console.log(list)
}

main()
