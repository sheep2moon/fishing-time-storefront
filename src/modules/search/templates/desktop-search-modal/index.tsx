import useToggleState from "@lib/hooks/use-toggle-state"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"
import Search from "@modules/common/icons/search"
import DesktopHit from "@modules/search/components/desktop-hit"
import DesktopHits from "@modules/search/components/desktop-hits"
import SearchBox from "@modules/search/components/search-box"
import { InstantSearch } from "react-instantsearch-hooks-web"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/components/dialog"
import { Button } from "../../../common/components/button"
import { Input } from "../../../common/components/input"

const DesktopSearchModal = () => {
  const { state, close, open } = useToggleState()

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2" variant="outline">
            <Search />
            Wyszukaj
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[600px] top-16 translate-y-0">
          {/* <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader> */}
          <div className="grid gap-4 py-4">
            <InstantSearch
              indexName={SEARCH_INDEX_NAME}
              searchClient={searchClient}
            >
              <div className="flex items-center gap-2">
                <SearchBox />
              </div>
              <div className="overflow-y-scroll flex-1 mt-6 max-h-[300px]">
                <DesktopHits hitComponent={DesktopHit} />
              </div>
            </InstantSearch>
          </div>
          <DialogFooter>
            <Button variant="ghost">Zamknij</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Modal isOpen={state} close={close} size="large">
        <Modal.Body>
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div className="flex flex-col h-full">
              <div className="w-full flex items-center gap-x-2 bg-gray-50 p-4">
                <Search />
                <SearchBox />
              </div>

              <div className="overflow-y-scroll flex-1 no-scrollbar mt-6">
                <DesktopHits hitComponent={DesktopHit} />
              </div>
            </div>
          </InstantSearch>
        </Modal.Body>
      </Modal> */}
    </div>
  )
}

export default DesktopSearchModal
