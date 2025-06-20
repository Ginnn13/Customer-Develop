"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Package, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo
const tematicas = [
  {
    id: 1,
    nombre: "Cumpleaños infantil",
    imagen: "https://www.clarin.com/2024/07/04/m9_o4NqrT_1200x0__1.jpg",
  },
  {
    id: 2,
    nombre: "Baby shower",
    imagen: "https://lacavacakery.com/cdn/shop/articles/decoracion_baby_shower.jpg?v=1692725391",
  },
  {
    id: 3,
    nombre: "Aniversario",
    imagen: "https://i.pinimg.com/736x/e1/af/e1/e1afe182a0765763a8cf60143c6d55df.jpg",
  },
  {
    id: 4,
    nombre: "Despedida de soltero/a",
    imagen: "https://m.media-amazon.com/images/I/71RWu+UAUBL.jpg",
  },
  {
    id: 5,
    nombre: "Fiesta temática",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VGTyNG5lALZnI56V3UlIAO5pIwaEJ5wexw&s",
  },
  {
    id: 6,
    nombre: "Graduación",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BoajLpL3sVWo32pANGDJqcDvvjQbVVLesw&s",
  },
]

const colores = [
  { id: 1, nombre: "Rosa", hex: "#FF69B4" },
  { id: 2, nombre: "Azul", hex: "#1E90FF" },
  { id: 3, nombre: "Verde", hex: "#32CD32" },
  { id: 4, nombre: "Amarillo", hex: "#FFD700" },
  { id: 5, nombre: "Rojo", hex: "#FF4500" },
  { id: 6, nombre: "Morado", hex: "#9370DB" },
  { id: 7, nombre: "Naranja", hex: "#FF8C00" },
  { id: 8, nombre: "Turquesa", hex: "#40E0D0" },
]

const elementos = [
  {
    id: 1,
    nombre: "Globos",
    imagen: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/g/l/globos-olego-n9-surtido-bolsa-x-100-und-67717-default-1.jpg",
    precio: 15,
  },
  {
    id: 2,
    nombre: "Guirnaldas",
    imagen: "https://img.freepik.com/vector-gratis/decoracion-cumpleanos-guirnaldas_23-2148449230.jpg?semt=ais_hybrid&w=740",
    precio: 20,
  },
  {
    id: 3,
    nombre: "Platos decorativos",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9YyewdtL--trBBAdhHLvybYcocrjVo8lbw&s",
    precio: 25,
  },
  {
    id: 4,
    nombre: "Vasos coloridos",
    imagen: "https://m.media-amazon.com/images/I/61Y8R17H6kL.jpg",
    precio: 18,
  },
  {
    id: 5,
    nombre: "Servilletas",
    imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMWFRUXFxUVGBcXFRgVFhgVFRYWFhUXFxYYHSghGBolGxUVITEhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OGxAQGy0mICUtLS8vLy0tLS8tLS4tLS0tLy8tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABAUHAgMGAQj/xABQEAABAwEDBQgNCQYFBAMAAAABAAIDEQQSIQUGMUFRBxMiU2FxgZEUFSMyM1JykpOhscHwVGNzssLR0tPhFzRCQ2KCJKKj4vFkg8PjFkSz/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAUBAwQCBv/EADQRAAIBAgQCCAQGAwEAAAAAAAABAgMRBBIhMVGhBRMUIjJBYZFCcYHhM1KxwdHwBhUjYv/aAAwDAQACEQMRAD8AvBCEIAELTPOG86UvuP8AEetAEihIBx8Y9ayDj4x60AOoSN4+Mesrwk+MesoAfQkBXxj1le4+MesoAeQkgTtPWUVO09ZQA6hJVO31lFeX1lADqEljt9ZRU7T1lADqElU7T1leVPjHrKAHkJHheMeso4XjHrQA8hIku8Y9a8vnaetAD6Ejvh8Y9axc53jHrQBIIUY2ZwPfHpxCfhmDhy6wgDYhCEACEIQAJa12kNHKteUspxwgX3tYTWl400afaoXtnA41NojP9y6UW/Ii6Hmkk1KYaElHb7Px8fnLc3KEHHM85GWXALjSKJcZQg45nnLIW6A/zmecjK+AXN4CCFrFqh41vnI7Ki4xvnBRlfAkzoii19kxcY3zgjsqLjG+cEZXwA24oWrsqHjGecF52ZDxjPOCMr4Bc3/GtFFo7Nh41nnBHZ0PGs84IyvgRc3IWjs6HjWecF72dDxrPOCMr4BdG5eYrSbfDxrOsL2O2QuIa2RhJwABqUZXwC5sAKyoVs3lAi5lBJroi6tm9jkXu9IA1XEXFtEYQWBACj2LW15aff8AGpOuiC0vibtQA3BMHDl2fdyLaosANNb2j1KQglDhUIA2IQhAFY7sVaxXTSjHn/M1VELU/wAc9aufdSjq5n0Un1mqlXDEp1gdaaFuMupaG8W2Tx3daz7Nk8d3Wl2hZLeoowub4m3syTx3dakrC6S7eL3Y6MdSQsNn3x4bq0nmHxRT0jKKupZaGigm9WKvtMg/jPWlpsoyj+N3WttoUbMcUQimFWbWzNxynNxjutY9speMd1pYrxW5FwM3WS4jXbGXjHdaO2EvGO60qhGRcA6yXEZ7Pl8d3Wjs+XjHdaWQjIiM8uIz2fL47ute9sJfHd1pVCMiJ6yXEb7Yy+OetWLuR2B8rpLTISWt7nGCdLiAXu6AWj+8qryvonNLJHYtkhiwDgyr/Lfwn68MSR0DYsGPmoU7LzNmCUpTu3oiUDjWhrqpp5de39F6W6SNPOswa16liOCMTzYU160kGp4DUf8AI9S8qQdBp0nHlW17a0odHUvGuqebSgBDLUNodERZXsjlq2j5Gl7QAakXQcSdHSl3w2pxqJY2twq0xE6qOF4uFcamqlcW1qcPXq1ryVtdGGvb1hSnYixDywWppNJmUOjuJJBqDjR2IoHDnIKStdntncy2aIkSXpKscL0VAN7aAcCeEbx5NVVPufjQnGlfgdaUlqCTXDm59BU5wsISSHEGox9XPrU7kVtGHn9wUHLwulT2ShRp5/cFBI6hCFAHCbojayM+hk+s1UhOOEedXpn2KzMHzMn1mqjrYOG7nKc4DwC7G+RravV4FnGwuIA0kgDpwTIW7snshWajL50uOHkjAeuvqTE6buBrQ0aAAB0JG0FZL3dxnGOWKRH2pyjnnFOWpy15PydLaH3IY3SO2NGjlcTg0cpKvi1FXbMVW8pWQmhWTkTcqc+htM9z+iIXj57sOoFS9ozYyJZcJpYy7ZJaOF5jXD2LLLpGivDd/Itjgqj3svmU+vaKzp7ZkFuFIjzRSu9YalnvyG/QWD08f3Kh9K23pz9izsF/jj7lcoXfPyDkqTCO0tadgnYT1PxS9ozBJFYZw4f1N+00+5C6awu024/NMh9G1vhs/k0cShTdszVtUf8ALvjaxwd/lwd6lDyxlpo4Fp2OBaeorfRxVGt+HNP5My1KFSn44tErmjYBaLbZ4iKh0jSRtaysjh1NI6V9Eg0NKbKbP0/4VMbj9kv21z+LheRhXFzmtHqLldDXVryGiVdJTvVtwQywMbU78Ty7pIAr8D3epANRQjYMcNKxHBGJw5fVU+9eWqRrRVzwwDW4gDpqUubS1ZtWpkcCKDDHQFldBNdY9WtQVszus0eF50hHiNw63UHrSVjz7srn0eXxAnS9ou9LmuNBz4KhYui3lUkWdVO17HUNdhiNvNpI6QtbxdpQYcnNs6PYthF5ooaVoRQ19mkLEnGh06di0FZokAPx8U0JOR2mv6atabkbjUH45NiUlNRzoATcMRQaTq610GTu9PP7goBmDmgmvqXQWDQ7n+yFLAaQhCgDi89h3dn0Mn1gqNyh4R/Oryz18Oz6GT6wVG2/wj+dOMD4RdjdjUFJZCivTN/pBd1YD1kKOap3NhmMjtgaOskn2BMJu0WYaSvURLzlRtpKkZykBA6R7WN0uIA6dZ5Nay5lFOT2Qxab0RnkHN91rkOJbE08J+vyW8vs9S7K3Zes2TWbxBGHSD+W00ANO+lft6yeZI5eyq2wWdsMGEhFGnAlo/ikP9RNacvNRV4ZtdcTiSTUknEknWa60roQn0i+tqaU/hXH1ZNerHCLJTV5+b4ehO5XzitVqqJZnBh/lxkxx02EA1d0kqIZE0aAB0LtM1Nz822zMtHZG93i8Xd6vd64trW+NimP2R/9Z/o/+xMlXw9LuLS3oLpYfE1e89b+pW1QvC4Kyf2Rf9Z/of8AsUDnnmJ2BZzObTvnCawN3u5UurrvnUDqVkcZRk0kzh4GrFXaORcGnSB1LxgDTVlWHa1xafUrKsW5bHLZo5BaJGyviY/ENLA5zQ6hAFaY7VxOaebj7bajZrwZcvGR2mgY66Q0ayXEAdfIoWIozTfDfQ67LWg16mmDL1pZ3tocRsfST1uxThzre4XZ4I5W8nB9Tqj2KQ3QcyRk9jJY5XPjc64Q8C811C4GooCKNOrD2c1kXIlpthIs0TpKd8cGtbXa9xAryVqsc8Dga8escUvVaPlY1Rr4uk8mZv0ep1ObGdtksj3PjjdEXgNcHsc5tGkkULCaaV18OesUxrHOxruTe3+o0cOoqmspQPglfDJg9ji1wBBAI04jSk3PB0gFZavQ2ddytJfN356PmaafSEo6Spr6afbkXlLlKd48OCOQiP2gKLtUTzi4OPKan/Mqkitbmd497fJeW+wpuPOC0t0TydJDvrApNX/xjETd+tv87/cYU+l6a3hb2+x3NqUTPA51aDAaScGgbXOOACgXZ0Wo6ZiedrPwpG35VlkHdJHOoCaE4dQwRh/8ZxEZd+cUvS7/AGR1U6Vptd2LufR2bERZY7MK3u5RknQSC0U08hAx1KTeAdXLRacmi7FE2v8ALYBqwDB9y2uZjUH49y3qOXQpvfU0OJqajm2JO0NwJaMTswrrTrnVH/PwCkpsBia6Bo9qkBZmLhUa1P2DQ7n+yFABvDGKn7AcHeV9kKWA0hCFAHF56+Hj+hk+s1UdlHwr+dXjnr4eP6GT6zVR2UfCv504wPhF+N2NLV0mbLe5uP8AVTqaPvXNtXUZt+BPln2NW6t4TJh/xBq0FO5qQAyuef4W06XHT1A9aRnTVgluWS1PGkMfToYae1JulJNYWSjvJpe7SG2FS61N+V37I43LuVjaJ5Ja4E0byMGDB1Y85Kj9+WkITWnCNOChHZKwsms8nJ7s+jdy5lMl2blD3edI8+9cVn1uiW2y26aCF0YZHcArHeNSxrjjXa5d9udspkyx/QMPnC971AZwblkNrtMtodaJWukcHFrWsIFGtbQVGxoSiEqarSdTbX9RjKMsiUTgTusZS8aL0Q+9QOcud1rtwHZEgLWVLWtaGtBp31BpNMMfvVmfsXs/yqbzY/uVUZfyeyG1SwRvMjGPMYeaVdSgOjDvqjoW+jKhKXcWq9DNUjUS7zPp3JLLsETdkcY6mgL59zStltFuklsEe+yVkLmGl10bn43quFBW7jWtelfQ9bsfkt9gVL7gra2md3zDf8zx+FYcO7QqS+RoqK8ooid0fLmUJ3sjtsPY7W1eyMDAnQX36kPIrTDRVW5ua2NseTbLdFL8YlPK6ThEnr9QXJ7vVN4su3fX48lzH3dS7zNCK7YbI3ZZ4B1RtU1p5qEbK2rCEbVGU1nTmRlGa2WmVlle5j5pHNN+LFpcbpxfXRRcRFZ3ueGMa5zyaBrQXOJ5ANPQrGy5umW6d77JBHGwvkdA1zbxkNXmNt0k0aThjQ0qrBzWzas2SbMXuLb7WXppiMcBUhusMGoe0rT2idKCzpX8kVdVGcu79SobFubZTkFex7g+ckY09VSR0hJZYzJt9laXzWd1waXsLZGjlNwkgcpC7LK27JMXkWWzxhgODpbznOG0taWhvNUrttzvPHtlHJfjDJIy0ODSSxzXg3XCuI71wpjo04qJVsRBZpRViVTpydkz53WMgwPMV2G6nkNlkt7hEA2OVjZmtGhpcXNe0cl5pP8AdTUuRK205qcVJeZnksrsfUuTHB8ERIGMbDQ8rR963VNdGGrZo6xqSObrf8LZjUg7xDXzG/HSn7wNekcvSvPS3Ga2F5hgSAK+3pS0+OkadtOdMv4IxJOIGPvKVtDa0x+D7f0UEijAb4ww5FP2DQ7yvcFAxO4dOZT1gGDvK9wUsBpCEKAOMz0Hd4/oZPrNVHZTHdX86vPPL94j+hk+s1Udlfwz+dOMDsL8bsLBdLm0e5uH9f2QuaCns2JPCN8k+0H3LdV8JjoP/oSc63WBl+z2qMaTG4jpY4e4LXOvci2kRzCveu4B6dHrp1pT0jTlPDSy7qzX0dxrh5JVVfZ3XurFfBBT+XMnGzzyRHQDVvKw4sPVhzgqOk0HmTGnUjUipx2auYpRcW4vyPqPNCK5YbI3ZZ4R/ptVHZ0Z321tstLY7XM1jZpWtaHkABry0ADZgr9yU2kEQGgRxjqaFVGUdyC0SyyydlRC/JI+lx+F9xdTTypVhp04zk6htqxk4pROCmzstz2lrrZOQcCN8cKjoKjcnsvSxN2yRjreArIbuLz67XF6N5+0o3L2ZjcmWnJ4dPvrpZ2l/BDGhrJYaECpP8RrU6lvjXpPuw5IzOnNayLvyu+7BMdkch6mFVNuAR8O1HYyAdZkPuVpZyse6yWhsbS55hlDWjSXFjgAOUlV3uGWcxm2skaWSNdCHNcKOGEmkHRrS6m/+E/oapfiR+pp3f5eDZW/Tu6hGPerQySy5BEPFijHUwKrd3uxSv3iRsbjGxkoc8CrWue6MNDjqrQUVpWGZssDHMIuvjaWkYijmih9aKn4MPqEfHIoLczaJMrwF3jzPHK4RSuHrx6Fe+cOTIbTA6G0EiJ129R9zvXBwF4coCoWzZFtuSZ47XNA4MglaC8Fpa4OqwhprjeaXAc4qrxytYYMp2J0YcHRTsBa8Y0IIcxw5Q4DDkIVuLs5xknpxOKGkWnuc0NzrIw0+u1OHscpKDKWSclxFkcsMY74tY/fZHmlMcS5x1Yqp7fuWZQjcWtgZK2uD2PYARto8gjmT2Styq03XSWtzLPExrnuo4PfRrSdXBaOUk8y6cINd6rdEKUk9IHP58ZyHKFqdNdLWACONp0hjSTV39RLiekDVVQLInPIYwVc4hrRtc40aOshY4gCoIJAOIpgfcu53JM3jabWJ3DuVnIfXbL/AC2iuzvugbVulKNKnpsjOk5yLyssO9tbGBg1rWDmaKaK/FVk8VFRSvx9yya8Go2YU16tSwfwRpNOXV+iQDI0vOGIpq1FKT1BwGFOb34/G1OStBxr0j1pOV4rQnZzmtfuQAvEKu/T42qcsGh3P7goKBlH4V06FO2HQ7n+yEMBpCEIA47PL94i+hl+s1Uhlod2fzq7s8f3mL6GX6zFSWW/DP504wO30F+M2EwpTIElJaeM0jpwPuUWFus0tx7XbCD0a/UmMldNC+Ess0zrJUjOE68pSVZUMmMW6yC3wgCgtUQN2uG+s2c/v5CVwr2kEggggkEEUIIwIIOg6cF0peWuDmktcDUEYEFO2qSzW4UtBFntFKCcDub9glGrn1bdSyRhLCt5Vem/Jbx/lfp8iZSjV3dpfr9/1MsibqNts0TYQIpWsAa0yNcXBo0AlrhWmjapD9slt4mz+a/8a4nLmbtpsmMsZMeqVnDiI23x3v8AdRQ++K2MKFTvRSZDdWOjLKk3YrcRhHZx/Y8/bXG5ey/PbJd9tEhe6lBTghorUBoGjHpUNvi8vq2FOnB3ikcNze7LNybuw2qOIMfDHK8CgkLnNJpgC5owJ5qLmckZ6Wqz2uS1tcHPlJMrXDgPBNaEA4U1U0LlzIvL64VKmr2W505Sfmd/ndumT2+DeDEyJhLS+64uc66Q4CpAoKgHoWrNLdKtNgj3m62aId615LSyuJDXiuFdRB5KLhTIsd8R1VPLltoTmne9zts9N0GfKLWxuY2KJrr9xpLi5wBALnGlQKnCnuSObGedrsBO8ScAmpieL0ZO0CtWnlBFddVy++LwyIyQUcttA7173LcZu3TUxscZO0SuA6rh9q5nOrdGtluYYnFsUJ76OOvC5HvJqRyYBcS1xOAx5lYGYG50ba0TzyhkAfdLGGspIpg46IwajaeENGlVOFGms9jvNOXduRWQ8l2rK07YowKMAD5LpDI2nW463GmDddOcr6CzfyJHYoWQQjgNGJPfOcaXnu2kn7tAC25JyRBZ4mRWdgjY3QG6yRiS44uJ1k44J1sgqR/z+qw167qaeRfCmonrsRgtdcKEU6a/AXrgGg0/QfovHgOoa6NY+9Zyw0y1BwxHxilpky94BpX7ylJmUqRXbTl+9AC1lJvY8vt9SnbD/F5X2QoOykOcMa8ynLDod5X2QhgMoQhAHGZ5fvMP0Mv1mKkssHuz+dXZnt+8RfQy/WYqQymayv504wHh+gvxuwuFksQvUzFh0eTp70bdo4J6NHqos5FE5Hno4tOh3tH6KVeVmkrSGFKeaApMEhOxSMoSkrV3E4qq5nkrLtos3gpCG62HhMPO04dSblt9gtH71YbjtclkdvZJ2mJ3BPSVHWDJ7p5WxMpeeSBeNBgCcSAdQKxsmTnyCUtp3JjpHVJ71pAN3DE48i4nQot5rWfFaPkUwr1YaJ6DMmatgk/d8pb2fEtUDm055Y6t9SUlzAtWmGWyWj6K1R16pLq3zZFla4MoHEwi0cE6IiK1NaYgDQo4NquOov4Z++v8FqxTXiiYy5k5Rbpskh8ksf8AUcUo/Ni3DTY7R6F/3J9riNBI5iR7EzYopZpGxMLnOcaAXjp68BpPQuOoqr4l7P8AksWLh+V+/wBiGGbNt12aRvlAM+uQvBm9PXh70zyp4z/lY5zvUuhypkV8LQ8vilaXFl6J98B4xLTUAg0Uauo0JP4l9F9zl4tLaPMTbkRo7+cHkjY53rkuU6itrMnwjQ0u5Xu9zQB11TFEK6OHit22VSxU3toYtYBoAHMKLpsxM5jYbRecSYX0bKOTU8Da2vSKrm0BWTpxnFxexRGpKMsx9PMfeo5pDmkAgg4EGhBBGkELZWowPxtVY7kmdFR2FKcRUwknS3S6PHZpHJUagrLc26CRXbTVz0XnK1J0puLHtKoqkcyBpIoCBqG1Yyg4Efdq2rJwDh1Y8oWJdQ0OzrxGv40qosMHFISEgGvXt6NqdewVJ9W1JykOFOtAC8Y4YU5YdDvK+y1QDDR7efSp+waHeV9lqlgMoQhQBxWfPh4foZvaxUhlDwr+dXfnz4eH6Kb2sVIZQ8K/nTnAeH6C7G7GkIQEJkLDJrqEEaQp2KW80Hb8FQCdydNpb0j3riaurl9CdnYkHpeRbXFewwB9e6MZTxy4V5rrSqloaZamzNu0NitcMjzRrXYk6Bea5tTyVIT8WT3WSK1umLAJInRR0e1xkL3ggtANaUFcVGPycOPg86T8tLnJbflFn86T8tDs3e/IzyTOts9scLQGRvAL8nMDRVorM1p3sVOF4Vd1pGa1S2ayz91Y6fspoc8XXHhwgupUaf4Sedc8clt+UWfzpPy152rHyiz+dJ+WoyR48jnvHbZPfJv1mMDoxYbsYoTHQOpwg4Hhb7f1/quQyeXdm1ZK2J2+vLXv70GpoDyHR0rR2rb8os/nSflo7WN+U2fzpPy1MYpX15A02dTLDHG+zzzxxWeYWmOoieCx8dQXSFgJDADrqtVpyfvMNtM12j54XBrXtc4xb/UuAacAQTTXgubGS2/KLP50n5aO1bflFn86T8tRlXHkTrwO7ikm7IkJfF2GY5N5AdHdpvZuCMDhB1K16eRQ+SLTG6CO1vI3yyRyR3Tpe4gCzGmsC+7qXOdq2/KLP50n5aDktvymz+dJ+WoUI8eQa8Dscl2l28QGztLxQmek8MQ30urJv7ZI3FwO2ujQBpPDW9zTK8taGtL3UaHXg0VODXDSNhTHatvyiz+dJ+Wve1g+UWfzpPy13BRi2/5OZKTQnZrQ+N7XxuLXtIc1w0hwxBX0Lmll0WyyxzAAE8F7Qa0kHfCnrHIV89WmG466Htf/AFMJLcecA+pdnuTZZ3q0GB57nNQc0o7wjlPe9IVGOoqpTzLdGjB1HCeV+ZdMgOBFOnDUde1eVr8epBdQgatuJ9a8cwVrr59PPt0pENzQaitaU26+kUStpBIw58fYdn6Ju8CKHpCTn4NNNOk6kAKxu4Y2/GtTuT9DvK+y1QAFXgqeyccHeV9lqkBtCEKAOKz78PD9FP7Y1SGUPCv51d2fnh4Pop/bGqQt/hH86c4Dwi7GmoIQEJkhYCyY6hBGpYoUgSrXgiqxcUtZpMKJuAxmu+Oe3ZdYH9dXtp61S1Y1qWZGhybsFlgfHIZZN7cHRhp08EiV0gu68GAA+MWg0BXjm2fjZvQM/OWtzLPxs3oGfnrlu6tqvocvTgS0uR7Nww19W75g/fY6NAn3q5RxqTvZEpccCAKUxqu3JVmqQ6WrQ8tDmuYC9pNla1+NQG92ldSlaNIJqDSN3uzcbN6Bn56N7s3GzegZ+euVF/mfsc5lwXuSsWRbM44TOpTjIgWU30Fz69+CY20DQDwxXVVWIQtsznBo3xzAOG8VreoS1pxIqK4bEnvVm42b0DPz15cs3Gz+gZ+eqqtF1LJylo0/Py8iyFVRvaK2ZMS5Ggfc3tzY6hpumRpfTfImvc4mRzcGve4EXa3DwcFg7Ilnut7vQuLWteXxmMucyRxq1vCaGuY1hJ1urgore7Nxs3oI/wA9G92bjZvQM/PVuWX5n7HDkuC9yYsuTLK5oeH3hdebpkawjw9x8gJqSbkQutpiRtxzbkKzhze6OcKu4O+wjfGtdCBI12hjC2SR108KjDTQSITe7Nxs/oGfno3uzcbP6CP89GSV/E/YnNHgvcwylZwx7rpaWlz7t116jQ8hteiiUT292bjZ/QR/no3uzcbP6CP89XKVl5+zKnG7EUxkp5bJUGhFCCNIIOBCwtDWA8AuLdrmhh5cA53tRk/wimWqCnpI+kMiZRFogjl1uaCdgdocOggpjEVqRTTXX06lyW5tODC+M6WODhie9fjo18IO611rJK6QQcdWHXoIXmqscs2h9F3RrmFRhhz+wpSZ+NDpTMnBpStKjaaDRo0pa0AO2+sFVnQgAd8Hx1bV0GTu9Ple4Lnmv4dCDp2e9dDk3vT5R9gUsBtCEKAOHz/Pd4PorR7Y1SVt8I7nKuzdD8NAfmrR/wCNUlajV7ucp1gPCLcaa0IQmItBCEKQMmOoU7k+AyysiDmtL3Bt55o0V1uI0BILJctXOlKx3OVsyAxtkFnnE77TI5gcKCKjRUuaRUkABxJqdC2f/ELDLK+yQWuR1rYHd+wCF72Cr2NIFajHWdB00KmbBlFlms2RZZDRgdMHE6Gh7HsvHkF4Hmql8kZqzWXKTrZMWsssTpZt+L23XteH3QADWvDxqNR2iqvrZ2d5bXt6u4w6uN1aPC/orHN5HzZhFndarfK+GISGFrWNBkfI0kOAqCAAQR/adFEtnRm8yzshtFnkM1mmBuOcKOa4aWPG3A6hoOxdLaWnKuTyyzAGaG1TTGGoa4xzPkc0i8QP5g80pLO1nYuTrLYZC0zh755Ggh29h1+gJGvh/wCUq6FWTmrvW9rehVKnFQdlpbf1OTyrGAYqACsMRNBSpLcSeVZixwiOJz5Xsc9rn0EQeKCWSMAG+DXudcRrRljTF9BD9VY5QHcrMdW9PFdVeyZ8KrUtlqZ3uxm12GOBsbpIbQRICWGQtgDgKVIYA91MRjUVqlLfAwMikjDmiS/VrnB9Cx13BwaKg12dakbRFNPZrNG2GXuO/Ve4XWESvDm3XuNMAKJbK1mfHDZ2vaWu7saHYXihB1jlC5jLVXet3+/kdSWj00F3MHYzXUFd+eK0xoI4jSvOT1pEFSQdSzMOy0PPVHEpd+c0b5b7rNvjrwLC5zXSVMj3htblaAvaGhtD3MAkgkKc0lsr7kZU93Y5ZehdVPlaMCr8nkNDn980AX3tiBGMd0OO9HAAH11xt2V4mHepLE1rmMuhpLKsL77/ABMPCtPjcAVJxUddK/h5ol0o/m5M5dbcmCsiyyjOx8j3sYI2k1DBSjeQUAC25Cjq4nlXcnoRSXeLQ3Ppbk5FaB0Rr/YQfYXLv5G3m7KjkPWNYVe5oClrh5RIP9Nx9ysJzboF0YVGiujkCQ4pd8dU9jBztRpXHq9uxJzsNag/HIU7I0O1cuscnONKUlOJBB5NNOvbzrMWEe01cKbVP5M70+UfY1c/IKOqFP5LPBd5R9jVLAdQhCgDgt0t1JID83P/AONUnKeEecq491qS6YD83P7Y1TBcneA/Dv8A3zFmNetjNCxBWVVvF9gQhCm5AJrJ0AkljY43Q57WkilQCQCRU0qlUxZLNvleHGynjuu15sMVEnodRWpPW3N260k2llxploKl5Aja92gYXjc73A8JvKAxZ83WltyS1VALSAx9WgOfGG8F2AJY+9yVA1FQPar5+z+l/RHar5+z+l/RZrNq2bkaL/8AnmTEebBaeDamB43o1YSBdl3wEh1QTiwAUreL26EhlvI7oGh5lbJecWmmmoaHVNTUnHowxxolu1Xz9n9L+i9GS/n7P6X9F1FtO7lyOWk1ZR5jclkEskTC8M/w0brztHBjrQ8+hP2fIdpZebFa2sFW0uyyNaQ6+Km6MHcEVpUaceCVES2EupetFnNGho7roa3ADvVj2vNLvZEF2t67v2F6lK0pStMKqGrqylyJXy5j/aJ0sbJjaGkuY1530uqL1agEXnEig1Aadi9fmlI0UM0IOBAvupdLXOJrd5BoBGJNcFG9q/n7P6T9F67JtdNos50DGWuAFANGoAdSnVbS5Bo/h5njv3Rv08n/AOcSUs07o3tew0c0hzTsLTUHFPmwOu3OyLPdDi6m+/xEAE97saOpYdqvn7P6X9FZGUbNMrcZO1jO05wWiTvn/wATXigAo5hJYRspX2JS3218zzJI684horQDBoDRo5AEx2r+fs/pf0R2r+fs/pf0QurjsElN7kXKcF0Oblm0KEls3dQy819KGrHXm9a7TN+zKurPu3NGHpu51Obcf+LhGjCTo7m4e9d800oDTkpguIzab/iXOGNyN3W4gYctLy7F0gPwRoSTEu8xpDYzlGNQfj70pK+tcVk+0UNNVMNfWdSQtcwxI9qznYnLJQ4nX06dfKukyMasd5X2WrjZrSD+uC6vNt1YneWfqtUsCWQhCgCq92qahgH9EvrdH9yqKq+ic9MzWZQuF0hjcwEVDQ4FpoaEGmsesrl2bj0Y/wDsk/8AaH4kzw2Kp06ai9zFXw8qkrop+8vQ5XKNySP5R/oj8SyG5RHx/wDoj8Sv7fS4lHYpFM3kX1dI3K2cePQj8SyG5czjh6EfiU/7CmHYZFKX0X1do3MWcc30I/EsxuaM41voR+JR/sKZPYZcSkoZQHAkAgEEjaAdCamt0ZAuwhpqDW8TXAihBFKY1wpoVx/s1ZxrfQj8SP2as45voR+JQ8dSZKwcl5lQ9s46itnZShBFaVrdoagVwunr56+DKUVKdjs851dFNKt47mjOOb6EfiXn7M2ccPQj8ajttL+3J7LPiVB2fFjSBo4TXDhE0DbtW4jEGh0+NyIfb4j/ACG/w14bhWlKigoBUYaNat47mTOPHoR+JH7MWcePQj8SO20v7cOyT48ioo7fGGtBga4gDG8W1wANboGsVWl9pYWgCIAinCvE1oKOqOXA6cFcf7MWcePQj8SP2ZM48ehH4lPbqQdklx5FRx2+INAdZ2uIu1N9wrdFKnDCvIsu2Edaizs1ggucQQS04bDQEV/qVt/syZx49CPxL39mbOPHoR+JHbaX9uHZJ8f0Ki7Oh+TN9I/ooo2SSgV3jc0Zx49CPxLw7mTOPHoR+JHbqa2/cjscn5lQ5Es9TUjErv8AJkd1q66zZitZ/Naf+yB9pP8A/wAZwoJB6P8A3Kipi4y2NNOjkOezamuiR50vcGjmb+pPUpaS26wfepKHIF1obfFB83pxrXvtqy7RnjB5n+5YZzzSbNCVkQr8o1rio2e20GnD19JXUOzer/MHo/8Actbs2K/zB6P/AHLm5JxkslThz7V3GaDqwHyz9VqUdmkdU1P+2PxKayTYN4juXi7EkkimJ5OgKGwHUIQoAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIA//9k=",
    precio: 10,
  },
  {
    id: 6,
    nombre: "Manteles",
    imagen: "https://i5.walmartimages.com/asr/d8a739be-1e7b-4bee-920d-5aa022045fad.3d6aa066f346ba21c46970b91554c92e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    precio: 30,
  },
  {
    id: 7,
    nombre: "Figuras colgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRshC7DdC-peoxS2ABbmvFUXEcxWlymuxjnJpOfUdXXZHPxHdwDvK4MaplRfEWmVHVCHI4&usqp=CAU",
    precio: 22,
  },
  {
    id: 8,
    nombre: "Confeti",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5t3ZZvuvDaKRJbJX9-VMstaJ5EYQrLtJPew&s",
    precio: 12,
  },
  {
    id: 9,
    nombre: "Velas decorativas",
    imagen: "https://fanfun.com.pe/cdn/shop/files/Here_sWhyJanuaryBirthdaysAreTrulyTerrible.jpg?v=1691530478",
    precio: 15,
  },
  {
    id: 10,
    nombre: "Cajitas sorpresa",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZOe_n0FGVjteqeqhXzWwNrd887GO60CiKQ&s",
    precio: 28,
  },
]

export default function PersonalizarPage() {
  const [paso, setPaso] = useState(1)
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState<number | null>(null)
  const [coloresSeleccionados, setColoresSeleccionados] = useState<number[]>([])
  const [elementosSeleccionados, setElementosSeleccionados] = useState<{ id: number; cantidad: number }[]>([])

  const avanzarPaso = () => {
    setPaso(paso + 1)
  }

  const retrocederPaso = () => {
    setPaso(paso - 1)
  }

  const seleccionarTematica = (id: number) => {
    setTematicaSeleccionada(id)
  }

  const toggleColor = (id: number) => {
    if (coloresSeleccionados.includes(id)) {
      setColoresSeleccionados(coloresSeleccionados.filter((colorId) => colorId !== id))
    } else {
      setColoresSeleccionados([...coloresSeleccionados, id])
    }
  }

  const agregarElemento = (id: number) => {
    if (elementosSeleccionados.some((elem) => elem.id === id)) {
      // Si ya existe, incrementar cantidad
      setElementosSeleccionados(
        elementosSeleccionados.map((elem) => (elem.id === id ? { ...elem, cantidad: elem.cantidad + 1 } : elem)),
      )
    } else {
      // Si no existe, agregar con cantidad 1
      setElementosSeleccionados([...elementosSeleccionados, { id, cantidad: 1 }])
    }
  }

  const eliminarElemento = (id: number) => {
    setElementosSeleccionados(elementosSeleccionados.filter((elem) => elem.id !== id))
  }

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarElemento(id)
    } else {
      setElementosSeleccionados(elementosSeleccionados.map((elem) => (elem.id === id ? { ...elem, cantidad } : elem)))
    }
  }

  const calcularTotal = () => {
    return elementosSeleccionados.reduce((total, elem) => {
      const elemento = elementos.find((e) => e.id === elem.id)
      return total + (elemento?.precio || 0) * elem.cantidad
    }, 0)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Package className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold">PartyBox</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Catálogo
            </Link>
            <Link href="/decorador-virtual" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Decorador Virtual
            </Link>
            <Link href="/personalizar" className="text-sm font-medium text-pink-500">
              Personalizar
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/carrito">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Carrito
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Personaliza tu PartyBox</h1>
            <p className="text-gray-500">Crea el kit perfecto para tu evento en simples pasos</p>
          </div>

          {/* Pasos de personalización */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 1 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">1</div>
              <div>
                <h3 className="font-medium">Elige tu temática</h3>
                <p className="text-sm text-gray-500">Selecciona el tipo de evento</p>
              </div>
            </div>
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 2 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">2</div>
              <div>
                <h3 className="font-medium">Personaliza colores y elementos</h3>
                <p className="text-sm text-gray-500">Adapta tu kit a tus gustos</p>
              </div>
            </div>
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 3 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">3</div>
              <div>
                <h3 className="font-medium">Revisa y confirma</h3>
                <p className="text-sm text-gray-500">Finaliza tu pedido</p>
              </div>
            </div>
          </div>

          {/* Contenido según el paso */}
          <div className="mb-8">
            {paso === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Elige la temática para tu evento</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tematicas.map((tematica) => (
                    <div
                      key={tematica.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${tematicaSeleccionada === tematica.id ? "ring-2 ring-pink-500" : ""}`}
                      onClick={() => seleccionarTematica(tematica.id)}
                    >
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={tematica.imagen || "/placeholder.svg"}
                          alt={tematica.nombre}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="font-medium">{tematica.nombre}</span>
                        {tematicaSeleccionada === tematica.id && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paso === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personaliza tu kit</h2>

                <Tabs defaultValue="colores" className="mb-8">
                  <TabsList className="mb-4">
                    <TabsTrigger value="colores">Colores</TabsTrigger>
                    <TabsTrigger value="elementos">Elementos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colores">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Selecciona los colores para tu kit</h3>
                      <p className="text-sm text-gray-500 mb-4">Puedes elegir hasta 3 colores principales</p>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {colores.map((color) => (
                          <div
                            key={color.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${coloresSeleccionados.includes(color.id) ? "ring-2 ring-pink-500" : ""}`}
                            onClick={() => toggleColor(color.id)}
                          >
                            <div className="w-full h-12 rounded-md mb-2" style={{ backgroundColor: color.hex }} />
                            <div className="flex items-center justify-between">
                              <span>{color.nombre}</span>
                              {coloresSeleccionados.includes(color.id) && (
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="elementos">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Selecciona los elementos para tu kit</h3>
                      <p className="text-sm text-gray-500 mb-4">Personaliza tu kit con los elementos que necesitas</p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {elementos.map((elemento) => (
                          <div key={elemento.id} className="border rounded-lg overflow-hidden">
                            <div className="flex items-center p-3">
                              <div className="w-16 h-16 bg-gray-100 rounded-md mr-3">
                                <img
                                  src={elemento.imagen || "/placeholder.svg"}
                                  alt={elemento.nombre}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{elemento.nombre}</h4>
                                <p className="text-sm text-gray-500">S/. {elemento.precio.toFixed(2)}</p>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => agregarElemento(elemento.id)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {elementosSeleccionados.some((elem) => elem.id === elemento.id) && (
                              <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-6 h-6"
                                    onClick={() => {
                                      const elem = elementosSeleccionados.find((e) => e.id === elemento.id)
                                      if (elem) actualizarCantidad(elemento.id, elem.cantidad - 1)
                                    }}
                                  >
                                    <span>-</span>
                                  </Button>
                                  <span className="mx-2">
                                    {elementosSeleccionados.find((elem) => elem.id === elemento.id)?.cantidad || 0}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-6 h-6"
                                    onClick={() => {
                                      const elem = elementosSeleccionados.find((e) => e.id === elemento.id)
                                      if (elem) actualizarCantidad(elemento.id, elem.cantidad + 1)
                                    }}
                                  >
                                    <span>+</span>
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                  onClick={() => eliminarElemento(elemento.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {paso === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Revisa y confirma tu PartyBox</h2>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resumen de tu kit personalizado</CardTitle>
                        <CardDescription>Revisa los detalles antes de confirmar</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Temática seleccionada</h3>
                          <div className="flex items-center p-3 border rounded-lg">
                            <div className="w-16 h-16 bg-gray-100 rounded-md mr-3">
                              <img
                                src={tematicas.find((t) => t.id === tematicaSeleccionada)?.imagen || ""}
                                alt="Temática"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {tematicas.find((t) => t.id === tematicaSeleccionada)?.nombre || "No seleccionada"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Colores seleccionados</h3>
                          <div className="flex flex-wrap gap-2">
                            {coloresSeleccionados.map((colorId) => {
                              const color = colores.find((c) => c.id === colorId)
                              return color ? (
                                <div key={color.id} className="flex items-center p-2 border rounded-lg">
                                  <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: color.hex }} />
                                  <span>{color.nombre}</span>
                                </div>
                              ) : null
                            })}
                            {coloresSeleccionados.length === 0 && (
                              <p className="text-gray-500">No has seleccionado colores</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Elementos seleccionados</h3>
                          {elementosSeleccionados.length > 0 ? (
                            <div className="border rounded-lg overflow-hidden">
                              <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 font-medium">
                                <div className="col-span-2">Elemento</div>
                                <div className="text-center">Cantidad</div>
                                <div className="text-right">Precio</div>
                              </div>
                              <Separator />
                              {elementosSeleccionados.map((elem) => {
                                const elemento = elementos.find((e) => e.id === elem.id)
                                return elemento ? (
                                  <div key={elemento.id} className="grid grid-cols-4 gap-4 p-3 border-b last:border-0">
                                    <div className="col-span-2 flex items-center">
                                      <div className="w-10 h-10 bg-gray-100 rounded-md mr-2">
                                        <img
                                          src={elemento.imagen || "/placeholder.svg"}
                                          alt={elemento.nombre}
                                          className="object-cover w-full h-full"
                                        />
                                      </div>
                                      <span>{elemento.nombre}</span>
                                    </div>
                                    <div className="text-center">{elem.cantidad}</div>
                                    <div className="text-right">S/. {(elemento.precio * elem.cantidad).toFixed(2)}</div>
                                  </div>
                                ) : null
                              })}
                            </div>
                          ) : (
                            <p className="text-gray-500">No has seleccionado elementos</p>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Información de entrega</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="nombre">Nombre completo</Label>
                                <Input id="nombre" placeholder="Tu nombre completo" />
                              </div>
                              <div>
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input id="telefono" placeholder="Tu número de teléfono" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="direccion">Dirección de entrega</Label>
                              <Input id="direccion" placeholder="Tu dirección completa" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <div>
                                <Label htmlFor="ciudad">Ciudad</Label>
                                <Input id="ciudad" placeholder="Ciudad" />
                              </div>
                              <div>
                                <Label htmlFor="distrito">Distrito</Label>
                                <Input id="distrito" placeholder="Distrito" />
                              </div>
                              <div>
                                <Label htmlFor="codigo-postal">Código postal</Label>
                                <Input id="codigo-postal" placeholder="Código postal" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Resumen de compra</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>S/. {calcularTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Envío</span>
                          <span>S/. 15.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>S/. {(calcularTotal() + 15).toFixed(2)}</span>
                        </div>

                        <div className="pt-4">
                          <Label htmlFor="metodo-pago">Método de pago</Label>
                          <Select defaultValue="tarjeta">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un método de pago" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tarjeta">Tarjeta de crédito/débito</SelectItem>
                              <SelectItem value="yape">Yape</SelectItem>
                              <SelectItem value="plin">Plin</SelectItem>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-pink-500 hover:bg-pink-600"
                          onClick={() => {
                            // Aquí agregarías la lógica para agregar al carrito
                            window.location.href = "/carrito"
                          }}
                        >
                          Agregar al Carrito
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navegación entre pasos */}
          <div className="flex justify-between">
            {paso > 1 ? (
              <Button variant="outline" onClick={retrocederPaso}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            ) : (
              <div></div>
            )}

            {paso < 3 ? (
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                onClick={avanzarPaso}
                disabled={
                  (paso === 1 && tematicaSeleccionada === null) || (paso === 2 && elementosSeleccionados.length === 0)
                }
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container px-4 py-6 mx-auto md:px-6">
          <p className="text-sm text-center text-gray-500">© 2024 PartyBox. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
