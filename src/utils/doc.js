export default function(_bus){
  document.addEventListener('mouseup',()=>{
    _bus.$emit('doc_mouse_up')
  })
}